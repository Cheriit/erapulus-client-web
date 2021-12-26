import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UniversityEditFormService} from './university-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusUniversity, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.university.title' | translate}}</ep-header>
        <ep-university-edit-logo [universityId]="university.id" *ngIf="university"></ep-university-edit-logo>
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

  constructor (
    private readonly route: ActivatedRoute,
    private readonly universityEditFormService: UniversityEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly universityDataAccessService: UniversityDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.edit');
    const id: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.universityDataAccessService.getUniversity({id}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.university = response.payload as ErapulusUniversity;
        this.form = this.universityEditFormService.createForm(this.university);
        this.loading = false;
        this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
          this.changeDetectorRef.markForCheck();
        }));
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
