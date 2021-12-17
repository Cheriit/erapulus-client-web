import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SIDEBARSTORE_FEATURE_KEY, sidebarStoreAdapter, State} from './sidebar-store.reducer';

// Lookup the 'SidebarStore' feature state managed by NgRx
export const getSidebarStoreState = createFeatureSelector<State>(
  SIDEBARSTORE_FEATURE_KEY
);

const {selectAll, selectEntities} = sidebarStoreAdapter.getSelectors();

export const getSidebarStoreLoaded = createSelector(
  getSidebarStoreState,
  (state: State) => state.loaded
);

export const getSidebarStoreError = createSelector(
  getSidebarStoreState,
  (state: State) => state.error
);

export const getAllSidebarStore = createSelector(
  getSidebarStoreState,
  (state: State) => selectAll(state)
);

export const getSidebarStoreEntities = createSelector(
  getSidebarStoreState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSidebarStoreState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSidebarStoreEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
