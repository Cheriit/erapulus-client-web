import {SidebarStoreEntity} from './sidebar.models';
import {initialState, SidebarPartialState, sidebarStoreAdapter} from './sidebar.reducer';
import * as SidebarStoreSelectors from './sidebar.selectors';

describe('SidebarStore Selectors', (): void => {
  const ERROR_MSG = 'No Error Available';
  const getSidebarStoreId = (it: SidebarStoreEntity): string | number => it.id;
  const createSidebarStoreEntity = (id: string, name = ''): SidebarStoreEntity =>
    ({
      id,
      name: name || `name-${id}`
    } as SidebarStoreEntity);

  let state: SidebarPartialState;

  beforeEach(() => {
    state = {
      sidebarStore: sidebarStoreAdapter.setAll(
        [
          createSidebarStoreEntity('PRODUCT-AAA'),
          createSidebarStoreEntity('PRODUCT-BBB'),
          createSidebarStoreEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('SidebarStore Selectors', () => {
    it('getAllSidebarStore() should return the list of SidebarStore', () => {
      const results = SidebarStoreSelectors.getAllSidebarStore(state);
      const selId = getSidebarStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SidebarStoreSelectors.getSelected(
        state
      ) as SidebarStoreEntity;
      const selId = getSidebarStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSidebarStoreLoaded() should return the current "loaded" status', () => {
      const result = SidebarStoreSelectors.getSidebarStoreLoaded(state);

      expect(result).toBe(true);
    });

    it('getSidebarStoreError() should return the current "error" state', () => {
      const result = SidebarStoreSelectors.getSidebarStoreError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
