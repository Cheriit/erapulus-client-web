import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  authUser$ = this.store.pipe(select(AuthSelectors.getAuthUser));
  token$ = this.store.pipe(select(AuthSelectors.getAuthToken));

  constructor (private readonly store: Store) {
    this.init();
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init (): void {
    this.store.dispatch(AuthActions.init());
  }
}
