import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FacultyCreateFormService} from './faculty-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-faculty-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()" (submit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.faculty.create.contact.title"
        description="management-panel.faculty.create.contact.description">
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
          {{'management-panel.faculty.actions.create' | translate}}
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./faculty-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyCreateFormComponent {
  @Input() form!: FormGroup;
  @Input() universityId!: string;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: FacultyCreateFormService,
    private readonly navigationService: NavigationService,
    private readonly router: Router
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
          NavigationRoutes.UNIVERSITY,
          this.universityId,
          NavigationRoutes.FACULTY
        ]).then();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
