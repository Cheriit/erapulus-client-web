import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {ProgramEditFormService} from './program-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusProgram, ProgramDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.university.title' | translate}}</ep-header>
        <ep-program-edit-form [form]="form" *ngIf="form"></ep-program-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./program-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public program!: ErapulusProgram;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly programEditFormService: ProgramEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly programDataAccessService: ProgramDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId: string = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.programDataAccessService.getProgram({id: programId, facultyId, universityId}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.program = response.payload as ErapulusProgram;
        this.form = this.programEditFormService.createForm(this.program, universityId);
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
