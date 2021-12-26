import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserCreateFormService} from './user-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

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
          [placeholder]="'management-panel.user.firstName.placeholder'| translate"
          [control]="formService.getControl('firstName')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.lastName.label'| translate"
          [placeholder]="'management-panel.user.lastName.placeholder'| translate"
          [control]="formService.getControl('lastName')"
        ></ep-input>
        <ep-select
          *ngIf="form.get('university')"
          class="form-element-full"
          [label]="'management-panel.user.university.label'| translate"
          [placeholder]="'management-panel.user.university.placeholder'| translate"
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
      <ep-form-section
        title="management-panel.user.create.password.title"
        description="management-panel.user.create.password.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.user.password.label'| translate"
          [placeholder]="'management-panel.user.password.placeholder'| translate"
          [control]="formService.getControl('password')"
          type="password"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.user.confirmPassword.label'| translate"
          [placeholder]="'management-panel.user.confirmPassword.placeholder'| translate"
          [control]="formService.getControl('confirmPassword')"
          type="password"
        ></ep-input>
      </ep-form-section>
      <div class="footer-buttons">
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
    this.formService.submitForm()?.subscribe((response) => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      if (response.status === HttpStatusCode.Created) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.USER
        ]).then();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }


}
