import {Action, createReducer, on} from '@ngrx/store';

import * as SidebarActions from './sidebar.actions';
import {SIDEBAR_FEATURE_KEY} from './sidebar.actions';
import {SidebarItem} from './sidebar.models';


export interface State {
  selectedItem: SidebarItem | null,
  items: SidebarItem[],
  opened: boolean
}

export interface SidebarPartialState {
  readonly [SIDEBAR_FEATURE_KEY]: State;
}

export const initialState: State = {
  selectedItem: null,
  items: [],
  opened: false
};

const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.registerSidebarItems, (state, {items}) => (
    {...state, items}
  )),
  on(SidebarActions.selectSidebarItem, (state, {selectedItem}) => (
    {...state, selectedItem}
  )),
  on(SidebarActions.setSidebarOpenedState, (state, {opened}) => (
    {...state, opened}
  )),
  on(SidebarActions.toggleSidebarOpenedState, (state) => (
    {...state, opened: !state.opened}
  ))
)
;

export function reducer (state: State | undefined, action: Action): State {
  return sidebarReducer(state, action);
}
