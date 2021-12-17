import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as SidebarStoreActions from './sidebar-store.actions';
import * as SidebarStoreSelectors from './sidebar-store.selectors';

@Injectable({
  providedIn: 'root'
})
export class SidebarStoreFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(SidebarStoreSelectors.getSidebarStoreLoaded)
  );
  allSidebarStore$ = this.store.pipe(
    select(SidebarStoreSelectors.getAllSidebarStore)
  );
  selectedSidebarStore$ = this.store.pipe(
    select(SidebarStoreSelectors.getSelected)
  );

  constructor (private readonly store: Store) {
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init (): void {
    this.store.dispatch(SidebarStoreActions.init());
  }
}
