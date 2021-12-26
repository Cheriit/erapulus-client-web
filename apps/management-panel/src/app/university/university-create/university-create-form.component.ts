import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UniversityCreateFormService} from './university-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-university-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.university.create.contact.title"
        description="management-panel.university.create.contact.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.name.label'| translate"
          [placeholder]="'management-panel.university.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.university.address.label'| translate"
          [placeholder]="'management-panel.university.address.placeholder'| translate"
          [control]="formService.getControl('address')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.university.address2.label'| translate"
          [placeholder]="'management-panel.university.address2.placeholder'| translate"
          [control]="formService.getControl('address2')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.university.zipcode.label'| translate"
          [placeholder]="'management-panel.university.zipcode.placeholder'| translate"
          [control]="formService.getControl('zipcode')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.university.city.label'| translate"
          [placeholder]="'management-panel.university.city.placeholder'| translate"
          [control]="formService.getControl('city')"
        ></ep-input>
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.country.placeholder'| translate"
          [placeholder]="'management-panel.university.country.label'| translate"
          [control]="formService.getControl('country')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.university.create.details.title"
        description="management-panel.university.create.details.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.university.websiteUrl.label'| translate"
          [placeholder]="'management-panel.university.websiteUrl.placeholder'| translate"
          [control]="formService.getControl('websiteUrl')"
          type="url"
        ></ep-input>
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.university.description.label'| translate"
          [placeholder]="'management-panel.university.description.placeholder'| translate"
          [control]="formService.getControl('description')"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.university.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.create.university.create' | translate}}
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./university-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityCreateFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: UniversityCreateFormService,
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
          NavigationRoutes.UNIVERSITY
        ]).then();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
