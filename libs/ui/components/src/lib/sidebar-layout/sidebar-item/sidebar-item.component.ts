import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-sidebar-item',
  template: ` <p>sidebar works!</p> `,
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent {
}
