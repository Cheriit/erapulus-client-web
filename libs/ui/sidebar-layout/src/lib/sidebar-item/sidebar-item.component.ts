import {ChangeDetectionStrategy, Component, HostListener, Input} from '@angular/core';
import {SidebarItem} from '../+state/sidebar.models';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-sidebar-item',
  template: `
    <div [class.enabled]="item.enabled"
         [class.item--closed]="!opened"
         [class.item--opened]="opened"
         class="group hover:bg-gray-800/30 cursor-pointer transition-transform transition-opacity transition-colors hover:scale-110">
      <div
        [class.item-image--closed]="!opened"
        [class.item-image--opened]="opened"
        class="w-14 h-14"
      >
        <img [src]="item.iconPath" [alt]="item.title | translate" class="w-14 h-14"/>
        <img [src]="item.iconPath" [alt]="item.title | translate" *ngIf="!opened"
             class="opacity-0 group-hover:opacity-20 absolute top-0 left-0 w-full h-full origin-bottom-right group-hover:rotate-[15deg] transition-all group-hover:scale-90"/>
      </div>
      <div *ngIf="opened" class="text-white truncate w-full whitespace-normal">
        {{item.title}}
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent {
  @Input() item!: SidebarItem;
  @Input() selected!: boolean;
  @Input() opened!: boolean;

  constructor (private readonly router: Router) {
  }

  @HostListener('click')
  click (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      this.item.path
    ]).then();
  }
}
