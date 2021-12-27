import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {ProgramCreateFormService} from './program-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ep-program-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.create.program.title' | translate}}</ep-header>
      <ep-program-create-form [form]="form"></ep-program-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;

  constructor (
    private readonly programCreateFormService: ProgramCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.program.create');
    const universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    this.form = this.programCreateFormService.createForm(universityId, facultyId);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
