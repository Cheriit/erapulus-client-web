import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-container',
  template: `
    <div class="box">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
}
