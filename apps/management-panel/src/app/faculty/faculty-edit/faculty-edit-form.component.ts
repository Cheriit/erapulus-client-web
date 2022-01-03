import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FacultyEditFormService} from './faculty-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-faculty-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.faculty.edit.base.title"
        description="management-panel.faculty.edit.base.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.faculty.name.label'| translate"
          [placeholder]="'management-panel.faculty.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element-full"
          [label]="'management-panel.faculty.address.label'| translate"
          [placeholder]="'management-panel.faculty.address.placeholder'| translate"
          [control]="formService.getControl('address')"
        ></ep-input>
        <ep-input
          class="form-element-full"
          [label]="'management-panel.faculty.email.label'| translate"
          [placeholder]="'management-panel.faculty.email.placeholder'| translate"
          [control]="formService.getControl('email')"
          type="email"
        ></ep-input>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.faculty.actions.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.faculty.actions.save' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./faculty-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;

  constructor (
    public readonly formService: FacultyEditFormService,
    private readonly navigationService: NavigationService,
    public readonly universityDataAccessService: UniversityDataAccessService
  ) {
  }

  public submit (): void {
    this.formService.submitForm()?.subscribe((response) => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      if (response.status === HttpStatusCode.Ok) {
        this.navigationService.back();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
