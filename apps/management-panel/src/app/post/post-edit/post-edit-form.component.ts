import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PostEditFormService} from './post-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-university-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.university.create.contact.title"
        description="management-panel.university.create.contact.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.post.title.label'| translate"
          [control]="formService.getControl('title')"
          [placeholder]="'management-panel.post.title.placeholder'| translate"
        ></ep-input>
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.post.content.label'| translate"
          [control]="formService.getControl('content')"
          [placeholder]="'management-panel.post.content.placeholder'| translate"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.create.user.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()">
          {{'management-panel.create.user.create' | translate}}
          <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./post-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditFormComponent {
  @Input() form!: FormGroup;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: PostEditFormService,
    private readonly navigationService: NavigationService,
    public readonly universityDataAccessService: UniversityDataAccessService
  ) {
  }

  public submit (): void {
    this.formService.submitForm()?.subscribe(() => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      this.navigationService.back();
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
