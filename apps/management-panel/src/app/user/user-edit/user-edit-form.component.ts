import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserEditFormService} from './user-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-user-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <div class="flex flex-wrap">
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.firstName.label'| translate"
            [control]="formService.getControl('firstName')"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.lastName.label'| translate"
            [control]="formService.getControl('lastName')"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3"></div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.email.label'| translate"
            [control]="formService.getControl('email')"
            type="email"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.phoneNumber.label'| translate"
            [control]="formService.getControl('phoneNumber')"
            type="tel"
          ></ep-input>
        </div>
      </div>
      <div class="buttons">
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