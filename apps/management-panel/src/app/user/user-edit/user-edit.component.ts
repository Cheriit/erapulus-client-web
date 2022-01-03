import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take, zip} from 'rxjs';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UserEditFormService} from './user-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {UserPermissionsService} from '../user-permissions.service';
import {ErapulusHelpers, ErapulusUser, UserDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-user-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.user.edit.title' | translate}}</ep-header>
        <ep-user-edit-form [form]="form" *ngIf="form"></ep-user-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public user!: ErapulusUser;
  public loading = true;
  private readonly userRole$ = this.authFacade.role$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly userEditFormService: UserEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly userDataAccessService: UserDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.edit');
    const id: string = this.route.snapshot.paramMap.get('id') ?? '-1';
    this.subscriptionManager.subscribe(zip(ErapulusHelpers.handleRequest(this.userDataAccessService.getEmployee({id})), this.userRole$).pipe(take(1)).subscribe(([
      response,
      userRole
    ]) => {
      if (response.status !== HttpStatusCode.Ok) {
        return this.navigationService.back();
      }
      this.user = response.payload as ErapulusUser;
      if (userRole && UserPermissionsService.canAccess(userRole, this.user.type)) {
        this.form = this.userEditFormService.createForm(this.user);
        this.loading = false;
        this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
          this.changeDetectorRef.markForCheck();
        }));
        this.changeDetectorRef.markForCheck();
      } else {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.USER
        ]).then();
      }
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
