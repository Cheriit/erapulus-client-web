import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarFacade} from '../+state/sidebar.facade';
import {Store} from '@ngrx/store';
import {toggleSidebarOpenedState} from '../+state/sidebar.actions';

@Component({
  selector: 'ep-sidebar',
  template: `
    <aside *ngIf="(sidebarState$ | async) as sidebarState"
           class="h-screen w-16 bg-gradient-to-br from-base-from to-base-to shadow-2xl overflow-hidden flex flex-col justify-between absolute top-0 left-0 transition-all"
           [class.opened]="sidebarState.opened">
      <div class="overflow-y-auto flex-grow">
        <ep-logo></ep-logo>
        <ep-sidebar-item *ngFor="let item of sidebarState.items" [item]="item"
                         [selected]="item === sidebarState.selectedItem"
                         [opened]="sidebarState.opened"></ep-sidebar-item>
      </div>
      <div class="block h-11 mx-3 mb-3">
        <div [class.scale-x-[-1]]="!sidebarState.opened"
             class=" cursor-pointer drop-shadow-lg transition-all">
          <img alt="Expand" src="/assets/icons/arrows.svg" (click)="toggleOpen()"
               class="w-18 h-11 p-2 arrows float-right"/>
        </div>
      </div>
    </aside> `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  public sidebarState$ = this.sidebarFacade.allSidebarStore$;

  constructor (private sidebarFacade: SidebarFacade, private store: Store) {
  }

  public toggleOpen (): void {
    this.store.dispatch(toggleSidebarOpenedState());
  }

}
