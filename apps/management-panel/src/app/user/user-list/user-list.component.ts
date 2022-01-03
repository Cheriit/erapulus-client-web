import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthFacade, AuthUser, UserRole} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-user-list',
  template: `
    <ng-container *ngIf="(user$ | async) as user">
      <ep-admin-user-list *ngIf="adminListPermitted.includes(user.role)"></ep-admin-user-list>
      <ep-university-admin-user-list
        *ngIf="universityListPermitted.includes(user.role)"
        [universityId]="userRoles.ADMINISTRATOR === user.role ? null : user.universityId"></ep-university-admin-user-list>
      <ep-employee-user-list *ngIf="employeeListPermitted.includes(user.role)"
                             [universityId]="user.universityId"></ep-employee-user-list>
      <ep-student-user-list *ngIf="studentListPermitted.includes(user.role)"></ep-student-user-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  public user$: Observable<AuthUser | undefined> = this.authFacade.authUser$;
  public readonly adminListPermitted = [UserRole.ADMINISTRATOR];
  public readonly universityListPermitted = [
    UserRole.ADMINISTRATOR,
    UserRole.UNIVERSITY_ADMINISTRATOR
  ];
  public readonly employeeListPermitted = [UserRole.UNIVERSITY_ADMINISTRATOR];
  public readonly studentListPermitted = [UserRole.ADMINISTRATOR];
  public readonly userRoles = UserRole;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly titleService: TitleService
  ) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.list.title');
  }

}
