import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UniversityEditFormService} from './university-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-university-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.university.create.contact.title"
        description="management-panel.university.create.contact.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.name.placeholder'| translate"
          [control]="formService.getControl('name')"
          [placeholder]="'management-panel.university.name.label'| translate"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.university.address.placeholder'| translate"
          [label]="'management-panel.university.address.label'| translate"
          [control]="formService.getControl('address')"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.university.address2.placeholder'| translate"
          [label]="'management-panel.university.address2.label'| translate"
          [control]="formService.getControl('address2')"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.university.zipcode.placeholder'| translate"
          [label]="'management-panel.university.zipcode.label'| translate"
          [control]="formService.getControl('zipcode')"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.university.city.placeholder'| translate"
          [label]="'management-panel.university.city.label'| translate"
          [control]="formService.getControl('city')"
        ></ep-input>
        <ep-input
          class="form-element-full"
          [placeholder]="'management-panel.university.country.placeholder'| translate"
          [label]="'management-panel.university.country.label'| translate"
          [control]="formService.getControl('country')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.university.create.details.title"
        description="management-panel.university.create.details.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.websiteUrl.label'| translate"
          [control]="formService.getControl('websiteUrl')"
          [placeholder]="'management-panel.university.websiteUrl.label'| translate"
          type="url"
        ></ep-input>
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.description.label'| translate"
          [control]="formService.getControl('description')"
          [placeholder]="'management-panel.university.description.label'| translate"
        ></ep-input>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.user.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()">
          {{'management-panel.create.user.create' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./university-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: UniversityEditFormService,
    private readonly navigationService: NavigationService,
    public readonly universityDataAccessService: UniversityDataAccessService
  ) {
  }

  public submit (): void {
    this.formService.submitForm()?.subscribe(() => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      this.navigationService.back();
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}