import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take, zip} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusUser, UserDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-user-show',
  template: `
    <ep-container [loading]="!user">
      <div class="content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.user.title' | translate:({
          userFirstName: user?.firstName ?? '',
          userLastName: user?.lastName ?? ''
        })}}</ep-header>
        <ep-user-show-details [user]="user" *ngIf="user"></ep-user-show-details>
      </div>
    </ep-container>
  `,
  styleUrls: ['./university-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityShowComponent implements OnInit {
  public readonly headerType = HeaderType;
  public user?: ErapulusUser;
  private readonly userRole$ = this.authFacade.role$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly userDataAccessService: UserDataAccessService,
    private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.edit');
    const id: string = this.route.snapshot.paramMap.get('id') ?? '-1';
    zip(this.userDataAccessService.getEmployee({id}), this.userRole$).pipe(take(1)).subscribe(([
      {payload},
      userRole
    ]) => {
      this.user = payload;
      this.changeDetectorRef.markForCheck();
      // if (!userRole || !UniversityPermissionsService.canSelect(userRole, this.user.type)) {
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.USER
      ]).then();
      // }
    });
  }

}
