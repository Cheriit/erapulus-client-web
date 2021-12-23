import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export enum TextType {
  EXTRA_EXTRA_LARGE = 'xxl',
  EXTRA_LARGE = 'xl',
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
  EXTRA_SMALL = 'xs'
}

@Component({
  selector: 'ep-text',
  template: `
    <p [class]="textType">
      <ng-content></ng-content>
    </p> `,
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input() textType = TextType.MEDIUM;
}
