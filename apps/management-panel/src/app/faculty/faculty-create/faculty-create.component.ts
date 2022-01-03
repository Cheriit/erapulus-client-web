import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {FacultyCreateFormService} from './faculty-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ep-faculty-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.faculty.create.title' | translate}}</ep-header>
      <ep-faculty-create-form [form]="form" [universityId]="universityId"></ep-faculty-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public universityId!: string;

  constructor (
    private readonly facultyCreateFormService: FacultyCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.faculty.create');
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.form = this.facultyCreateFormService.createForm(this.universityId);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
