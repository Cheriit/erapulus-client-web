import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {ModuleEditFormService} from './module-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusModule, ModuleDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-module-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.module.edit.title' | translate}}</ep-header>
        <ep-module-edit-form [form]="form" *ngIf="form"></ep-module-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./module-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public module!: ErapulusModule;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly moduleEditFormService: ModuleEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly moduleDataAccessService: ModuleDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.module.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId: string = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    const moduleId: string = this.route.snapshot.paramMap.get('module_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.moduleDataAccessService.getModule({
      id: moduleId,
      programId,
      facultyId,
      universityId
    }))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.module = response.payload as ErapulusModule;
        this.form = this.moduleEditFormService.createForm(this.module, universityId, facultyId);
        this.loading = false;
        this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
          this.changeDetectorRef.markForCheck();
        }));
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  ngOnDestroy ()
    :
    void {
    this.subscriptionManager.unsubscribeAll();
  }
}
