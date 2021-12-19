import {createAction, props} from '@ngrx/store';
import {SidebarItem} from './sidebar.models';

export const SIDEBAR_FEATURE_KEY = '[Sidebar]';

export const SidebarActions = {
  REGISTER_SIDEBAR_ITEMS: `${SIDEBAR_FEATURE_KEY} Register Sidebar Items`,
  SELECT_SIDEBAR_ITEM: `${SIDEBAR_FEATURE_KEY} Select Sidebar Item`,
  SET_SIDEBAR_OPENED_STATE: `${SIDEBAR_FEATURE_KEY} Set sidebar opened state`,
  TOGGLE_SIDEBAR_OPENED_STATE: `${SIDEBAR_FEATURE_KEY} Toggle sidebar opened state`
};

export const registerSidebarItems = createAction(
  SidebarActions.REGISTER_SIDEBAR_ITEMS,
  props<{ items: SidebarItem[] }>()
);

export const selectSidebarItem = createAction(
  SidebarActions.SELECT_SIDEBAR_ITEM,
  props<{ selectedItem: SidebarItem }>()
);

export const setSidebarOpenedState = createAction(
  SidebarActions.SET_SIDEBAR_OPENED_STATE,
  props<{ opened: boolean }>()
);

export const toggleSidebarOpenedState = createAction(
  SidebarActions.TOGGLE_SIDEBAR_OPENED_STATE
);
