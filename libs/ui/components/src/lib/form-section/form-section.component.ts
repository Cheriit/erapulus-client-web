import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TextType} from '../text/text.component';
import {HeaderType} from '../header/header.component';

@Component({
  selector: 'ep-form-section',
  template: `
    <div class="flex flex-wrap md:-mx-2 ">
      <div class="first-column">
        <ep-header [headerType]="headerType.H4">{{title | translate}}</ep-header>
        <ep-text class="text-gray-500" [textType]="textType.SMALL"
                 *ngIf="description">{{description | translate}}</ep-text>
      </div>
      <div class="second-column">
        <ng-content></ng-content>
      </div>
    </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent {
  public headerType = HeaderType;
  public textType = TextType;

  @Input() title!: string;
  @Input() description?: string;
}
