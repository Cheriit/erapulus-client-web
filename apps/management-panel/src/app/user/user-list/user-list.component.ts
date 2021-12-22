import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounce, interval, Observable, Subject, take} from 'rxjs';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {UserListParameters, UserListService} from './user-list.service';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {UserListDataAccessService} from '@erapulus/data-access/erapulus';
import {HeaderType} from '@erapulus/ui/components';
import {Location} from '@angular/common';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';

@Component({
  selector: 'ep-users-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerSize.H3">{{'management-panel.user.list.admin.header' | translate}}</ep-header>
      <div *ngIf="adminTableConfiguration$ | async as adminTableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="adminTableConfiguration"
          [tableDataAccessService]="userTableDataAccessService"
          (tableElementEvent)="tableEvent($event)"
          (currentPageChange)="paginationChanged($event)"></ep-table>
      </div>
    </ep-container>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  public adminTableConfiguration$: Subject<TableConfiguration> = this.userListService.getListConfigurationObservable(this.getAdminBaseParameters());
  public headerSize = HeaderType;
  public userRole: Observable<UserRole | undefined> = this.authFacade.role$;
  public adminTableConfiguration!: TableConfiguration;
  public lastParameters!: Params;

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly userListService: UserListService,
    public readonly userTableDataAccessService: UserListDataAccessService,
    private readonly authFacade: AuthFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit (): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((parameters) => {
      this.lastParameters = parameters;
      this.reloadList();
    });

    this.adminTableConfiguration.filters.valueChanges.pipe(debounce(() => interval(1000))).subscribe(() => {
      this.updateRoute();
    });
  }

  public paginationChanged (page: number): void {
    this.adminTableConfiguration.currentPage = page;
    this.updateRoute();
  }

  public tableEvent (event: TableActionEvent): void {
    switch (event.type) {
    case TableAction.EDIT:
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.user.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.user.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(take(1)).subscribe((action) => {
        if (action === MessageAction.ACCEPT) {
          this.reloadList();
        }
      });
      break;
    case TableAction.SELECT:
    default:
      break;

    }
  }

  private updateRoute (): void {
    this.location.go(`${this.router.url.split('?')[0]}?page=${this.adminTableConfiguration.currentPage}&name=${this.adminTableConfiguration.filters.value['name']}`);
  }

  private reloadList (): void {
    this.adminTableConfiguration = this.userListService.getListConfiguration(this.getAdminBaseParameters());
    this.adminTableConfiguration$.next(this.adminTableConfiguration);
    this.changeDetectorRef.markForCheck();
  }

  private getAdminBaseParameters (): UserListParameters {
    return {
      type: UserRole.ADMINISTRATOR,
      page: this.lastParameters?.page ?? 0,
      name: this.lastParameters?.name ?? '',
      pageSize: 10
    };
  }
}
