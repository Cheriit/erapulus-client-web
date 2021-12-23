import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounce, interval, Observable, Subject, take} from 'rxjs';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {UserListParameters, UserTableService} from '../user-table.service';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {HeaderType} from '@erapulus/ui/components';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-admin-user-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerSize.H3">{{'management-panel.user.list.admin.header' | translate}}</ep-header>
      <div *ngIf="tableConfiguration$ | async as tableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="tableConfiguration"
          (tableElementEvent)="handleTableEvent($event)"
          (currentPageChange)="paginationChanged($event)"></ep-table>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  public tableConfiguration$: Subject<TableConfiguration> = this.userTableService.getListConfigurationObservable(this.getBaseParameters());
  public headerSize = HeaderType;
  public userRole: Observable<UserRole | undefined> = this.authFacade.role$;
  public tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;

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
      this.tableConfiguration.filters.valueChanges
        .pipe(debounce(() => interval(1000)))
        .subscribe(() => {
          this.updateRoute();
        }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public paginationChanged (page: number): void {
    this.tableConfiguration.currentPage = page;
    this.updateRoute();
  }

  public handleTableEvent (event: TableActionEvent): void {
    this.userTableService.handleTableEvent(event, UserRole.ADMINISTRATOR);
  }

  private updateRoute (): void {
    this.location.go(`${this.router.url.split('?')[0]}?admin_page=${this.tableConfiguration.currentPage}&admin_name=${this.tableConfiguration.filters.value['name']}`);
  }

  private reloadList (): void {
    this.tableConfiguration = this.userTableService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this.tableConfiguration);
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): UserListParameters {
    return {
      type: UserRole.ADMINISTRATOR,
      page: this.lastParameters?.admin_page ?? 0,
      name: this.lastParameters?.admin_name ?? '',
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
