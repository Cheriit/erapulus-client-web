import {Action} from '@ngrx/store';

import * as SidebarStoreActions from './sidebar.actions';
import {SidebarStoreEntity} from './sidebar.models';
import {initialState, reducer, State} from './sidebar.reducer';

describe('SidebarStore Reducer', () => {
  const createSidebarStoreEntity = (
    id: string,
    name = ''
  ): SidebarStoreEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid SidebarStore actions', () => {
    it('loadSidebarStoreSuccess should return the list of known SidebarStore', () => {
      const sidebarStore = [
        createSidebarStoreEntity('PRODUCT-AAA'),
        createSidebarStoreEntity('PRODUCT-zzz')
      ];
      const action = SidebarStoreActions.loadSidebarStoreSuccess({
        sidebarStore
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
