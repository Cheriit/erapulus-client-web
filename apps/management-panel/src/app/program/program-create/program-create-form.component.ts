import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProgramCreateFormService} from './program-create-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-program-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.program.create.contact.title"
        description="management-panel.program.create.contact.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.program.name.label'| translate"
          [placeholder]="'management-panel.program.name.placeholder'| translate"
          [control]="formService.getControl('name')"
        ></ep-input>
        <ep-input
          class="form-element"
          [label]="'management-panel.program.address.label'| translate"
          [placeholder]="'management-panel.program.address.placeholder'| translate"
          [control]="formService.getControl('abbrev')"
        ></ep-input>
      </ep-form-section>
      <ep-form-section
        title="management-panel.program.create.details.title"
        description="management-panel.program.create.details.description">
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.program.description.label'| translate"
          [placeholder]="'management-panel.program.description.placeholder'| translate"
          [control]="formService.getControl('description')"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.program.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.create.program.create' | translate}}
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./program-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCreateFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: ProgramCreateFormService,
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
        this.navigationService.back();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
