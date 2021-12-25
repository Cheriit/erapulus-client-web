import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export enum HeaderType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4'
}

@Component({
  selector: 'ep-header',
  template: `
    <h1 [class]="headerType">
      <ng-content></ng-content>
    </h1> `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() headerType = HeaderType.H1;
}
