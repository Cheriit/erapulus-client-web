import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounce, interval, Observable, Subject, take} from 'rxjs';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {UserListParameters, UserTableService} from '../user-table.service';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {HeaderType} from '@erapulus/ui/components';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-employee-user-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.user.list.employee.header' | translate}}</ep-header>
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
export class EmployeeUserListComponent implements OnInit, OnDestroy {
  public tableConfiguration$: Subject<TableConfiguration> = this.userTableService.getListConfigurationObservable(this.getBaseParameters());
  public headerType = HeaderType;
  public userRole: Observable<UserRole | undefined> = this.authFacade.role$;
  public tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  @Input() universityId!: number | null;

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
    this.userTableService.handleTableEvent(event, UserRole.EMPLOYEE);
  }

  private updateRoute (): void {
    this.location.go(`${this.router.url.split('?')[0]}?employee_page=${this.tableConfiguration.currentPage}&employee_name=${this.tableConfiguration.filters.value['name']}`);
  }

  private reloadList (): void {
    this.tableConfiguration = this.userTableService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this.tableConfiguration);
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): UserListParameters {
    return {
      type: UserRole.EMPLOYEE,
      universityId: this.universityId ?? undefined,
      page: this.lastParameters?.employee_page ?? 0,
      name: this.lastParameters?.employee_name ?? '',
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
