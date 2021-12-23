import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UserCreateFormService} from './user-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {UserAccessService} from '../user-access.service';

@Component({
  selector: 'ep-user-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header [headerType]="headerType.H3">{{'management-panel.create.user.title' | translate:({type})}}</ep-header>
      <ep-user-create-form [form]="form"></ep-user-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateComponent implements OnInit, OnDestroy {
  public type!: UserRole;
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  private readonly userRole$ = this.authFacade.role$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly userCreateFormService: UserCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.create');
    this.type = (this.route.snapshot.paramMap.get('type')?.toUpperCase() ?? UserRole.UNAUTHORIZED) as UserRole;
    this.form = this.userCreateFormService.createForm(this.type);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
    this.userRole$.pipe(take(1)).subscribe((role) => {
      if (!role || !UserAccessService.canAccess(role, this.type)) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.USER
        ]).then();
      }
    });
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
