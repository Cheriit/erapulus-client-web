import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounce, interval, Subject, take} from 'rxjs';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {UserListParameters, UserTableService} from '../user-table.service';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {HeaderType} from '@erapulus/ui/components';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ObjectUtils} from '@erapulus/utils/helpers';

@Component({
  selector: 'ep-university-admin-user-list',
  template: `
    <ep-container>
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.user.list.university-admin.header' | translate}}</ep-header>
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
export class UniversityAdminUserListComponent implements OnInit, OnDestroy {
  public reload$: Subject<void> = new Subject();
  public headerType = HeaderType;
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  @Input() universityId!: number | null;
  public tableConfiguration$: Subject<TableConfiguration> = this.userTableService.getListConfigurationObservable(this.getBaseParameters(), ObjectUtils.isEmpty(this.universityId));

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly userTableService: UserTableService,
    private readonly authFacade: AuthFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly router: Router,
    private readonly subscriptionManager: SubscriptionManagerService
  ) {
  }

  ngOnInit (): void {
    this.subscriptionManager.subscribe(
      this.userTableService.reloadList$.subscribe(() => {
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
    this.userTableService.handleTableEvent(event, UserRole.UNIVERSITY_ADMINISTRATOR);
  }

  private updateRoute (): void {
    this.location.go(`${this.router.url.split('?')[0]}?university_admin_page=${this._tableConfiguration.currentPage}&university_admin_name=${this._tableConfiguration.filters.value['name']}`);
  }

  private reloadList (): void {
    this._tableConfiguration = this.userTableService.getListConfiguration(this.getBaseParameters(), ObjectUtils.isEmpty(this.universityId));
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): UserListParameters {
    return {
      type: UserRole.UNIVERSITY_ADMINISTRATOR,
      universityId: this.universityId ?? undefined,
      page: this.lastParameters?.university_admin_page ?? 0,
      name: this.lastParameters?.university_admin_name ?? '',
      pageSize: 10,
      actions: [
        TableAction.NEW,
        TableAction.EDIT,
        TableAction.DELETE,
        TableAction.SELECT
      ]
    };
  }
}
