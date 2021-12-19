import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './sidebar.reducer';
import {SIDEBAR_FEATURE_KEY} from './sidebar.actions';

export const getSidebarState = createFeatureSelector<State>(
  SIDEBAR_FEATURE_KEY
);

export const getSidebarItems = createSelector(
  getSidebarState,
  (state: State) => state.items
);

export const getSelectedSidebarItem = createSelector(
  getSidebarState,
  (state: State) => state.selectedItem
);

export const getSidebarOpened = createSelector(
  getSidebarState,
  (state: State) => state.opened
);
