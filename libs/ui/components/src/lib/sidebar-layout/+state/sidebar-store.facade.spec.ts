import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';
import {NxModule} from '@nrwl/angular';
import {readFirst} from '@nrwl/angular/testing';

import * as SidebarStoreActions from './sidebar-store.actions';
import {SidebarStoreEffects} from './sidebar-store.effects';
import {SidebarStoreFacade} from './sidebar-store.facade';
import {SidebarStoreEntity} from './sidebar-store.models';
import {reducer, SIDEBARSTORE_FEATURE_KEY, State} from './sidebar-store.reducer';

interface TestSchema {
  sidebarStore: State;
}

describe('SidebarStoreFacade', () => {
  let facade: SidebarStoreFacade;
  let store: Store<TestSchema>;
  const createSidebarStoreEntity = (
    id: string,
    name = ''
  ): SidebarStoreEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SIDEBARSTORE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SidebarStoreEffects])
        ],
        providers: [SidebarStoreFacade]
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.inject(Store);
      facade = TestBed.inject(SidebarStoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allSidebarStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allSidebarStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadSidebarStoreSuccess` to manually update list
     */
    it('allSidebarStore$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allSidebarStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        SidebarStoreActions.loadSidebarStoreSuccess({
          sidebarStore: [
            createSidebarStoreEntity('AAA'),
            createSidebarStoreEntity('BBB')
          ]
        })
      );

      list = await readFirst(facade.allSidebarStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
