import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserRole} from '@erapulus/utils/auth';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {FacultyCreateFormService} from './faculty-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-university-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.create.university.title' | translate:({type})}}</ep-header>
      <ep-university-create-form [form]="form"></ep-university-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyCreateComponent implements OnInit, OnDestroy {
  public type!: UserRole;
  public readonly headerType = HeaderType;
  public form!: FormGroup;

  constructor (
    private readonly universityCreateFormService: FacultyCreateFormService,
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
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
