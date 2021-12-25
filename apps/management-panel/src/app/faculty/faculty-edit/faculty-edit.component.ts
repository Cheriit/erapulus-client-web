import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {FacultyEditFormService} from './faculty-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusFaculty, FacultyDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-faculty-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.faculty.title' | translate:({faculty: faculty?.name ?? ''})}}</ep-header>
        <ep-university-edit-form [form]="form" *ngIf="form"></ep-university-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./faculty-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public faculty!: ErapulusFaculty;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly facultyEditFormService: FacultyEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly facultyDataAccessService: FacultyDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.faculty.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    this.facultyDataAccessService.getFaculty({facultyId, universityId})
      .pipe(take(1))
      .subscribe((
        {payload}) => {
        this.faculty = payload;
        this.form = this.facultyEditFormService.createForm(this.faculty);
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
