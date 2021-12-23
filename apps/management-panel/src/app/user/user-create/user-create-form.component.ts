import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserCreateFormService} from './user-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';

@Component({
  selector: 'ep-user-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <div class="flex flex-wrap overflow-hidden">
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.firstName.label'| translate"
            [control]="formService.getControl('firstName')"
            [placeholder]="'management-panel.user.firstName.label'| translate"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.lastName.label'| translate"
            [control]="formService.getControl('lastName')"
            [placeholder]="'management-panel.user.lastName.label'| translate"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3"></div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.email.label'| translate"
            [control]="formService.getControl('email')"
            [placeholder]="'management-panel.user.email.label'| translate"
            type="email"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.phoneNumber.label'| translate"
            [control]="formService.getControl('phoneNumber')"
            [placeholder]="'management-panel.user.phoneNumber.label'| translate"
            type="tel"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3"></div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.password.label'| translate"
            [control]="formService.getControl('password')"
            [placeholder]="'management-panel.user.password.label'| translate"
            type="password"
          ></ep-input>
        </div>
        <div class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="'management-panel.user.confirmPassword.label'| translate"
            [control]="formService.getControl('confirmPassword')"
            [placeholder]="'management-panel.user.confirmPassword.label'| translate"
            type="password"
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
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./user-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (public readonly formService: UserCreateFormService, private readonly navigationService: NavigationService, private readonly router: Router) {
  }

  public submit (): void {
    this.formService.submitForm()?.subscribe(() => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.USER
      ]).then();
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }


}
