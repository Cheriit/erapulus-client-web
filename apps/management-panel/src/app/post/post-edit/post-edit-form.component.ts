import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PostEditFormService} from './post-edit-form.service';
import {NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-post-edit-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.post.edit.form.title"
        description="management-panel.post.edit.form.description">
        <ep-input
          class="form-element-full"
          [label]="'management-panel.post.title.label'| translate"
          [placeholder]="'management-panel.post.title.placeholder'| translate"
          [control]="formService.getControl('title')"
        ></ep-input>
        <ep-editor
          class="form-element-full"
          [label]="'management-panel.post.content.label'| translate"
          [placeholder]="'management-panel.post.content.placeholder'| translate"
          [control]="formService.getControl('content')"
        ></ep-editor>
      </ep-form-section>
      <div class="footer-buttons">
        <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
          {{'management-panel.post.actions.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.post.actions.save' | translate}}
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
    this.formService.submitForm()?.subscribe((response) => {
      this.form.enable();
      this.form.markAsTouched();
      this.form.markAsDirty();
      if (response.status === HttpStatusCode.Ok)
        this.navigationService.back();
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
