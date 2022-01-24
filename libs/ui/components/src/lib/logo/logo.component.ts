import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-logo',
  template: ` <p></p> `,
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
}
