import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as SidebarSelectors from './sidebar.selectors';

@Injectable({
  providedIn: 'root'
})
export class SidebarFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  sidebarItems$ = this.store.pipe(
    select(SidebarSelectors.getSidebarItems)
  );

  allSidebarStore$ = this.store.pipe(
    select(SidebarSelectors.getSidebarState)
  );

  selectedSidebarItem$ = this.store.pipe(
    select(SidebarSelectors.getSelectedSidebarItem)
  );

  sidebarOpened$ = this.store.pipe(
    select(SidebarSelectors.getSidebarOpened)
  );

  constructor (private readonly store: Store) {
  }
}
