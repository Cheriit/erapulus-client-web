import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {UniversityDocumentEditFormService} from './university-document-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusUniversityDocument, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-document-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.document.title' | translate}}</ep-header>
        <ep-university-document-edit-form [form]="form" *ngIf="form"></ep-university-document-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./university-document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityDocumentEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public universityDocument!: ErapulusUniversityDocument;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly universityEditFormService: UniversityDocumentEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly universityDataAccessService: UniversityDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const documentId: string = this.route.snapshot.paramMap.get('document_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.universityDataAccessService.getDocument({universityId, documentId}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.universityDocument = response.payload as ErapulusUniversityDocument;
        this.form = this.universityEditFormService.createForm(this.universityDocument);
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
