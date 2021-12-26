import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserEditFormService} from './user-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-user-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.user.edit.info.title"
        description="management-panel.user.edit.info.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.firstName.label'| translate"
          [placeholder]="'management-panel.user.firstName.placeholder'| translate"
          [control]="formService.getControl('firstName')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.lastName.label'| translate"
          [placeholder]="'management-panel.user.lastName.placeholder'| translate"
          [control]="formService.getControl('lastName')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.user.edit.contact.title"
        description="management-panel.user.edit.contact.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.email.label'| translate"
          [placeholder]="'management-panel.user.email.placeholder'| translate"
          [control]="formService.getControl('email')"
          type="email"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.phoneNumber.label'| translate"
          [placeholder]="'management-panel.user.phoneNumber.placeholder'| translate"
          [control]="formService.getControl('phoneNumber')"
          type="tel"
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
  styleUrls: ['./user-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: UserEditFormService,
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
