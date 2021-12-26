import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BuildingEditFormService} from './building-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-university-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.university.create.contact.title"
        description="management-panel.university.create.contact.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.building.name.label'| translate"
          [placeholder]="'management-panel.building.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.building.abbrev.label'| translate"
          [placeholder]="'management-panel.building.abbrev.placeholder'| translate"
          [control]="formService.getControl('abbrev')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.building.latitude.label'| translate"
          [placeholder]="'management-panel.building.latitude.placeholder'| translate"
          [control]="formService.getControl('latitude')"
          type="number"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.building.longitude.label'| translate"
          [placeholder]="'management-panel.building.longitude.placeholder'| translate"
          [control]="formService.getControl('longitude')"
          type="number"
        ></ep-input>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.user.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.create.user.create' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./building-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: BuildingEditFormService,
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
