import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ModuleEditFormService} from './module-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-module-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.module.edit.general-data.title"
        description="management-panel.module.edit.general-data.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.module.name.label'| translate"
          [placeholder]="'management-panel.module.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.module.abbrev.label'| translate"
          [placeholder]="'management-panel.module.abbrev.placeholder'| translate"
          [control]="formService.getControl('abbrev')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.module.edit.details.title"
        description="management-panel.module.edit.details.description">
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.module.description.label'| translate"
          [placeholder]="'management-panel.module.description.placeholder'| translate"
          [control]="formService.getControl('description')"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.module.actions.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.module.actions.save' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./module-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: ModuleEditFormService,
    private readonly navigationService: NavigationService
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
