import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UniversityCreateFormService} from './university-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {UniversityPermissionsService} from '../university-permissions.service';

@Component({
  selector: 'ep-university-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.university.create.title' | translate}}</ep-header>
      <ep-university-create-form [form]="form"></ep-university-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  private readonly user$ = this.authFacade.authUser$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly universityCreateFormService: UniversityCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.create');
    this.form = this.universityCreateFormService.createForm();
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.WELCOME
        ]);
      } else if (!UniversityPermissionsService.canCreate(user)) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.UNIVERSITY,
          user.universityId
        ]).then();
      }
    });
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
