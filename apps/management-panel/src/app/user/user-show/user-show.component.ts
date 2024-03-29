import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {zip} from 'rxjs';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {UserPermissionsService} from '../user-permissions.service';
import {ErapulusHelpers, ErapulusUser, UserDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-user-show',
  template: `
    <ep-container [loading]="!user">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.user.show.title' | translate}}</ep-header>
        <ep-user-show-details [user]="user" *ngIf="user"></ep-user-show-details>
      </div>
    </ep-container>
  `,
  styleUrls: ['./user-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserShowComponent implements OnInit {
  public readonly headerType = HeaderType;
  public user?: ErapulusUser;
  private readonly userRole$ = this.authFacade.role$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly userDataAccessService: UserDataAccessService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.show');
    const id: string = this.route.snapshot.paramMap.get('id') ?? '-1';
    zip(ErapulusHelpers.handleRequest(this.userDataAccessService.getEmployee({id})), this.userRole$).subscribe(([
      response,
      userRole
    ]) => {
      if (response.status !== HttpStatusCode.Ok) {
        return this.navigationService.back();
      }
      this.user = response.payload as ErapulusUser;
      this.changeDetectorRef.markForCheck();
      if (!userRole || !UserPermissionsService.canAccess(userRole, this.user.type)) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.USER
        ]).then();
      }
    });
  }

}
