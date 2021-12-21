import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarFacade} from '../+state/sidebar.facade';
import {Store} from '@ngrx/store';
import {toggleSidebarOpenedState} from '../+state/sidebar.actions';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {Router} from '@angular/router';

@Component({
  selector: 'ep-sidebar',
  template: `
    <aside *ngIf="(sidebarState$ | async) as sidebarState"
           class="h-screen w-20 bg-gradient-to-br from-base-from to-base-to shadow-2xl overflow-hidden flex justify-start flex-col absolute top-0 left-0 transition-all"
           [class.opened]="sidebarState.opened">
      <div class="overflow-y-auto overflow-x-hidden flex flex-wrap content-start flex-grow  flex-col">
        <ep-logo class="mb-16 w-full cursor-pointer" (click)="redirectToRoot()"></ep-logo>
        <ep-sidebar-item *ngFor="let item of sidebarState.items" [item]="item"
                         [opened]="sidebarState.opened"
                         class="mb-10 w-full"
        ></ep-sidebar-item>
      </div>
      <div class="block h-10 mx-5 mb-3">
        <div [class.reverse]="!sidebarState.opened"
             class="cursor-pointer drop-shadow-lg transition-all">
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

  constructor (private sidebarFacade: SidebarFacade, private store: Store, private router: Router) {
  }

  public toggleOpen (): void {
    this.store.dispatch(toggleSidebarOpenedState());
  }

  redirectToRoot (): void {
    this.router.navigate([NavigationRoutes.ROOT]).then();
  }


}
