import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as SidebarStoreActions from './sidebar-store.actions';
import {SidebarStoreEntity} from './sidebar-store.models';

export const SIDEBARSTORE_FEATURE_KEY = 'sidebarStore';

export interface State extends EntityState<SidebarStoreEntity> {
  selectedId?: string | number; // Which SidebarStore record has been selected
  loaded: boolean; // Has the SidebarStore list been loaded
  error?: string | null; // Last known error (if any)
}

export interface SidebarStorePartialState {
  readonly [SIDEBARSTORE_FEATURE_KEY]: State;
}

export const sidebarStoreAdapter: EntityAdapter<SidebarStoreEntity> =
  createEntityAdapter<SidebarStoreEntity>();

export const initialState: State = sidebarStoreAdapter.getInitialState({
  // Set initial required properties
  loaded: false
});

const sidebarStoreReducer = createReducer(
  initialState,
  on(SidebarStoreActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SidebarStoreActions.loadSidebarStoreSuccess, (state, {sidebarStore}) =>
    sidebarStoreAdapter.setAll(sidebarStore, {...state, loaded: true})
  ),
  on(SidebarStoreActions.loadSidebarStoreFailure, (state, {error}) => ({
    ...state,
    error
  }))
);

export function reducer (state: State | undefined, action: Action): State {
  return sidebarStoreReducer(state, action);
}
