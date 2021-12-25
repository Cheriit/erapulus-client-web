import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserCreateFormService} from './user-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-user-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.user.create.info.title"
        description="management-panel.user.create.info.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.firstName.label'| translate"
          [control]="formService.getControl('firstName')"
          [placeholder]="'management-panel.user.firstName.placeholder'| translate"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.lastName.label'| translate"
          [control]="formService.getControl('lastName')"
          [placeholder]="'management-panel.user.lastName.placeholder'| translate"
        ></ep-input>
        <ep-select
          *ngIf="form.get('university')"
          class="form-element-full"
          [placeholder]="'management-panel.user.university.placeholder'| translate"
          [label]="'management-panel.user.university.label'| translate"
          [control]="formService.getControl('university')"
          [accessor]="universityDataAccessService"
        ></ep-select>
      </ep-form-section>
      <ep-form-section
        title="management-panel.user.create.contact.title"
        description="management-panel.user.create.contact.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.email.label'| translate"
          [control]="formService.getControl('email')"
          [placeholder]="'management-panel.user.email.placeholder'| translate"
          type="email"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.phoneNumber.label'| translate"
          [control]="formService.getControl('phoneNumber')"
          [placeholder]="'management-panel.user.phoneNumber.placeholder'| translate"
          type="tel"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.user.create.password.title"
        description="management-panel.user.create.password.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.password.label'| translate"
          [control]="formService.getControl('password')"
          [placeholder]="'management-panel.user.password.placeholder'| translate"
          type="password"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.confirmPassword.label'| translate"
          [control]="formService.getControl('confirmPassword')"
          [placeholder]="'management-panel.user.confirmPassword.placeholder'| translate"
          type="password"
        ></ep-input>
      </ep-form-section>
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


  constructor (
    public readonly formService: UserCreateFormService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    public readonly universityDataAccessService: UniversityDataAccessService
  ) {
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
