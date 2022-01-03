import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {debounce, interval, Observable, Subject, take} from 'rxjs';
import {AuthFacade, AuthUser} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FacultyListParameters, FacultyListService} from './faculty-list.service';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-faculty-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.faculty.list.header' | translate}}</ep-header>
      <div *ngIf="tableConfiguration$ | async as tableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="tableConfiguration"
          (tableElementEvent)="handleTableEvent($event)"
          [reload$]="reload$"></ep-table>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyListComponent implements OnInit, OnDestroy {
  public user$: Observable<AuthUser | undefined> = this.authFacade.authUser$;
  public headerType = HeaderType;
  public reload$: Subject<void> = new Subject();
  public tableConfiguration$: Subject<TableConfiguration> = this.facultyListService.getListConfigurationObservable(this.getBaseParameters());
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  private universityId!: string;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly titleService: TitleService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly facultyListService: FacultyListService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.titleService.setTitle('management-panel.faculty.list.title');
    this.subscriptionManager.subscribe(
      this.facultyListService.reloadList$.subscribe(() => {
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
    this.facultyListService.handleTableEvent(event);
  }

  private updateRoute (): void {
    this.location.go(`${this.router.url.split('?')[0]}?faculty_page=${this._tableConfiguration.currentPage}&faculty_name=${this._tableConfiguration.filters.value['name']}`);
  }

  private reloadList (): void {
    this._tableConfiguration = this.facultyListService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): FacultyListParameters {
    return {
      page: this.lastParameters?.faculty_page ?? 0,
      name: this.lastParameters?.faculty_name ?? '',
      pageSize: 10,
      universityId: this.universityId
    };
  }

}
