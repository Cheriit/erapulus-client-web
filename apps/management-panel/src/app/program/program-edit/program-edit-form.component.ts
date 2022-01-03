import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProgramEditFormService} from './program-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {ProgramDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-program-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.program.edit.contact.title"
        description="management-panel.program.edit.contact.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.program.name.label'| translate"
          [placeholder]="'management-panel.program.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.program.abbrev.label'| translate"
          [placeholder]="'management-panel.program.abbrev.placeholder'| translate"
          [control]="formService.getControl('abbrev')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.program.edit.details.title"
        description="management-panel.program.edit.details.description">
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.program.description.label'| translate"
          [placeholder]="'management-panel.program.description.placeholder'| translate"
          [control]="formService.getControl('description')"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.program.actions.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.program.actions.save' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./program-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: ProgramEditFormService,
    private readonly navigationService: NavigationService,
    public readonly programDataAccessService: ProgramDataAccessService
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
