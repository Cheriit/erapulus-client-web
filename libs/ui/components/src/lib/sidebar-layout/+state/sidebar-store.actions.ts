import {createAction, props} from '@ngrx/store';
import {SidebarStoreEntity} from './sidebar-store.models';

export const init = createAction('[SidebarStore Page] Init');

export const loadSidebarStoreSuccess = createAction(
  '[SidebarStore/API] Load SidebarStore Success',
  props<{ sidebarStore: SidebarStoreEntity[] }>()
);

export const loadSidebarStoreFailure = createAction(
  '[SidebarStore/API] Load SidebarStore Failure',
  props<{ error: any }>()
);
