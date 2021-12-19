import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SidebarItem} from '../+state/sidebar.models';

@Component({
  selector: 'ep-sidebar-item',
  template: ` <p>sidebar works!</p> `,
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent {
  @Input() item!: SidebarItem;
  @Input() selected!: boolean;
  @Input() opened!: boolean;
}
