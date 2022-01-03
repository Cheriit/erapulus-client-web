import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {ModuleCreateFormService} from './module-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ep-module-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.create.module.title' | translate}}</ep-header>
      <ep-module-create-form [form]="form"></ep-module-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;

  constructor (
    private readonly moduleCreateFormService: ModuleCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.module.create');
    const universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    this.form = this.moduleCreateFormService.createForm(universityId, facultyId, programId);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
