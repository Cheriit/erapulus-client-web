import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';
import {NxModule} from '@nrwl/angular';
import {readFirst} from '@nrwl/angular/testing';

import * as SidebarStoreActions from './sidebar.actions';
import {SidebarFacade} from './sidebar.facade';
import {SidebarItem} from './sidebar.models';
import {reducer, SIDEBAR_FEATURE_KEY, State} from './sidebar.reducer';

interface TestSchema {
  sidebarStore: State;
}

describe('SidebarStoreFacade', () => {
  let facade: SidebarFacade;
  let store: Store<TestSchema>;
  const createSidebarStoreEntity = (
    title: string,
    path = '',
    enabled = false
  ): SidebarItem => ({
    title, path, enabled, iconPath: ''
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(SIDEBAR_FEATURE_KEY, reducer)],
        providers: [SidebarFacade]
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
      facade = TestBed.inject(SidebarFacade);
    });

    /**
     * Use `loadSidebarStoreSuccess` to manually update list
     */
    it('should get registered sidebar items', async () => {
      let list = await readFirst(facade.sidebarItems$);

      expect(list.length).toBe(0);

      store.dispatch(
        SidebarStoreActions.registerSidebarItems({
          items: [
            createSidebarStoreEntity('AAA'),
            createSidebarStoreEntity('BBB')
          ]
        })
      );

      list = await readFirst(facade.sidebarItems$);

      expect(list.length).toBe(2);
    });
  });
});
