import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {debounce, interval, Subject, take} from 'rxjs';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {ModuleListParameters, ModuleListService} from './module-list.service';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-module-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.module.list.header' | translate}}</ep-header>
      <div *ngIf="tableConfiguration$ | async as tableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="tableConfiguration"
          (tableElementEvent)="handleTableEvent($event)"
          (currentPageChange)="paginationChanged($event)"
          [reload$]="reload$"></ep-table>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleListComponent implements OnInit, OnDestroy {
  public headerType = HeaderType;
  public reload$: Subject<void> = new Subject();
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  public tableConfiguration$!: Subject<TableConfiguration>;
  private universityId!: string;
  private facultyId!: string;
  private programId!: string;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly moduleListService: ModuleListService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    this.programId = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    this.tableConfiguration$ = this.moduleListService.getListConfigurationObservable(this.getBaseParameters());

    this.subscriptionManager.subscribe(
      this.moduleListService.reloadList$.subscribe(() => {
        this.reloadList();
      }));

    this.activatedRoute.queryParams.pipe(take(1)).subscribe((parameters) => {
      this.lastParameters = parameters;
      this.reloadList();
    });

    this.subscriptionManager.subscribe(
      this._tableConfiguration.filters.valueChanges
        .pipe(debounce(() => interval(1000)))
        .subscribe(() => {
          this.updateRoute();
        }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public paginationChanged (page: number): void {
    this._tableConfiguration.currentPage = page;
    this.updateRoute();
  }

  public handleTableEvent (event: TableActionEvent): void {
    this.moduleListService.handleTableEvent(event);
  }

  private updateRoute (): void {
    this.location.go(
      `${this.router.url.split('?')[0]}?module_page=${this._tableConfiguration.currentPage}&module_title=${this._tableConfiguration.filters.value['title']}`);
  }

  private reloadList (): void {
    this._tableConfiguration = this.moduleListService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): ModuleListParameters {
    return {
      universityId: this.universityId,
      facultyId: this.facultyId,
      programId: this.programId,
      page: this.lastParameters?.module_page ?? 0,
      name: this.lastParameters?.module_name ?? '',
      pageSize: 10
    };
  }

}
