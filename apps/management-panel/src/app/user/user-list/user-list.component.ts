import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, take} from 'rxjs';
import {TableConfiguration} from '@erapulus/ui/table';
import {UserListParameters, UserListService} from './user-list.service';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {UserListDataAccessService} from '@erapulus/data-access/erapulus';
import {HeaderType} from '@erapulus/ui/components';

@Component({
  selector: 'ep-users-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerSize.H3">{{'management-panel.user.list.admin.header' | translate}}</ep-header>
      <div *ngIf="adminTableConfiguration$ | async as adminTableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="adminTableConfiguration"
          [tableDataAccessService]="userTableDataAccessService"></ep-table>
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

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly userListService: UserListService,
    public readonly userTableDataAccessService: UserListDataAccessService,
    private readonly authFacade: AuthFacade,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((parameters) => {
      this.adminTableConfiguration$.next(this.userListService.getListConfiguration(this.getAdminBaseParameters()));
      this.changeDetectorRef.markForCheck();
    });
  }

  private getAdminBaseParameters (): UserListParameters {
    return {
      type: UserRole.ADMINISTRATOR,
      page: 0,
      pageSize: 10
    };
  }
}
