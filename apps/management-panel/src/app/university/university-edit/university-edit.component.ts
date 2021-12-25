import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take, zip} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UniversityEditFormService} from './university-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusUniversity, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {UniversityPermissionsService} from '../university-permissions.service';

@Component({
  selector: 'ep-university-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.university.title' | translate:({university: university?.name ?? ''})}}</ep-header>
        <ep-university-edit-form [form]="form" *ngIf="form"></ep-university-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./university-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public university!: ErapulusUniversity;
  public loading = true;
  private readonly authUser$ = this.authFacade.authUser$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly universityEditFormService: UniversityEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly universityDataAccessService: UniversityDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.edit');
    const id: string = this.route.snapshot.paramMap.get('id') ?? '-1';
    zip(this.universityDataAccessService.getUniversity({id}), this.authUser$)
      .pipe(take(1))
      .subscribe(([
        {payload},
        user
      ]) => {
        this.university = payload;
        if (user && UniversityPermissionsService.canAccess(user, id)) {
          this.form = this.universityEditFormService.createForm(this.university);
          this.loading = false;
          this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
            this.changeDetectorRef.markForCheck();
          }));
          this.changeDetectorRef.markForCheck();
        } else {
          this.router.navigate([
            NavigationRoutes.ROOT,
            NavigationRoutes.WELCOME
          ]).then();
        }
      }
      );
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
