import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export enum TextSize {
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
  EXTRA_SMALL = 'xs'
}

@Component({
  selector: 'ep-text',
  template: `
    <p [class]="textSize">
      <ng-content></ng-content>
    </p> `,
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input() textSize = TextSize.MEDIUM;
}
