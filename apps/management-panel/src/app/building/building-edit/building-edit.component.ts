import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {BuildingEditFormService} from './building-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {BuildingDataAccessService, ErapulusBuilding} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-building-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.building.title' | translate:({building: building?.name ?? ''})}}</ep-header>
        <ep-university-edit-form [form]="form" *ngIf="form"></ep-university-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./building-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public building!: ErapulusBuilding;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly buildingEditFormService: BuildingEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly buildingDataAccessService: BuildingDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.building.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const buildingId: string = this.route.snapshot.paramMap.get('building_id') ?? '-1';
    this.buildingDataAccessService.getBuilding({buildingId, universityId})
      .pipe(take(1))
      .subscribe((
        {payload}) => {
        this.building = payload;
        this.form = this.buildingEditFormService.createForm(this.building);
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
