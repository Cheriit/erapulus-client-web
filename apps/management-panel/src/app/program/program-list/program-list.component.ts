import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {debounce, interval, Subject, take} from 'rxjs';
import {AuthFacade} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {ProgramListParameters, ProgramListService} from './program-list.service';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-program-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.program.list.header' | translate}}</ep-header>
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
export class ProgramListComponent implements OnInit, OnDestroy {
  public headerType = HeaderType;
  public reload$: Subject<void> = new Subject();
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  public tableConfiguration$!: Subject<TableConfiguration>;
  private universityId!: string;
  private facultyId!: string;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly titleService: TitleService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly programListService: ProgramListService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    this.tableConfiguration$ = this.programListService.getListConfigurationObservable(this.getBaseParameters());

    this.subscriptionManager.subscribe(
      this.programListService.reloadList$.subscribe(() => {
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

    this.titleService.setTitle('management-panel.title.program-list');
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public paginationChanged (page: number): void {
    this._tableConfiguration.currentPage = page;
    this.updateRoute();
  }

  public handleTableEvent (event: TableActionEvent): void {
    this.programListService.handleTableEvent(event);
  }

  private updateRoute (): void {
    this.location.go(
      `${this.router.url.split('?')[0]}?program_page=${this._tableConfiguration.currentPage}&program_title=${this._tableConfiguration.filters.value['title']}`);
  }

  private reloadList (): void {
    this._tableConfiguration = this.programListService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): ProgramListParameters {
    return {
      universityId: this.universityId,
      facultyId: this.facultyId,
      page: this.lastParameters?.program_page ?? 0,
      name: this.lastParameters?.program_name ?? '',
      pageSize: 10
    };
  }

}
