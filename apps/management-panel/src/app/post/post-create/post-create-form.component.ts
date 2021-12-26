import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PostCreateFormService} from './post-create-form.service';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-post-create-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="formService.submitForm()">
      <ep-form-section
        title="management-panel.post.create.contact.title"
        description="management-panel.post.create.contact.description">
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
          {{'management-panel.create.post.cancel' | translate}}
          <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
        <ep-button (click)="submit()" [submit]="true">
          {{'management-panel.create.post.create' | translate}}
          <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
        </ep-button>
      </div>
    </form>
  `,
  styleUrls: ['./post-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateFormComponent {
  @Input() form!: FormGroup;
  @Input() universityId!: string;
  public readonly buttonType = ButtonType;


  constructor (
    public readonly formService: PostCreateFormService,
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
          NavigationRoutes.POST
        ]).then();
      }
    });
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
