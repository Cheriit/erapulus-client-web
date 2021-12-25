import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BuildingCreateFormService} from './building-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';

@Component({
  selector: 'ep-building-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.building.create.contact.title"
        description="management-panel.building.create.contact.description">
        <ep-input
          class="form-element"
          [label]="'management-panel.building.name.label'| translate"
          [control]="formService.getControl('name')"
          [placeholder]="'management-panel.building.name.placeholder'| translate"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.building.abbrev.placeholder'| translate"
          [label]="'management-panel.building.abbrev.label'| translate"
          [control]="formService.getControl('abbrev')"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.building.latitude.placeholder'| translate"
          [label]="'management-panel.building.latitude.label'| translate"
          [control]="formService.getControl('latitude')"
          type="number"
        ></ep-input>
        <ep-input
          class="form-element"
          [placeholder]="'management-panel.building.longitude.placeholder'| translate"
          [label]="'management-panel.building.longitude.label'| translate"
          [control]="formService.getControl('longitude')"
          type="number"
        ></ep-input>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.building.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()">
          {{'management-panel.create.building.create' | translate}}
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./building-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingCreateFormComponent {
  @Input() form!: FormGroup;
  @Input() universityId!: string;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: BuildingCreateFormService,
    private readonly navigationService: NavigationService,
    private readonly router: Router
  ) {
  }

  public submit (): void {
    this.formService.submitForm()?.subscribe(() => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.BUILDING
      ]).then();
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
