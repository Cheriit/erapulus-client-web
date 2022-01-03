import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {ModuleDocumentEditFormService} from './module-document-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusProgramDocument, ProgramDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-module-document-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.module.document.edit.title' | translate}}</ep-header>
        <ep-module-document-edit-form [form]="form" *ngIf="form"></ep-module-document-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./module-document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleDocumentEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public programDocument!: ErapulusProgramDocument;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly programEditFormService: ModuleDocumentEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly programDataAccessService: ProgramDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.program.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId: string = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    const documentId: string = this.route.snapshot.paramMap.get('document_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.programDataAccessService.getDocument({
      universityId,
      documentId,
      facultyId,
      id: programId
    }))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.programDocument = response.payload as ErapulusProgramDocument;
        this.form = this.programEditFormService.createForm(this.programDocument);
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
