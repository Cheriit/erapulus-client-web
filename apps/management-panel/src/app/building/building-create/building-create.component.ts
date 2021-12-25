import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {BuildingCreateFormService} from './building-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ep-building-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.create.building.title' | translate}}</ep-header>
      <ep-building-create-form [form]="form" [universityId]="universityId"></ep-building-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public universityId!: string;

  constructor (
    private readonly buildingCreateFormService: BuildingCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.create');
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.form = this.buildingCreateFormService.createForm(this.universityId);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
