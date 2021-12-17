import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {DataPersistence, NxModule} from '@nrwl/angular';
import {hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';

import * as SidebarStoreActions from './sidebar-store.actions';
import {SidebarStoreEffects} from './sidebar-store.effects';

describe('SidebarStoreEffects', () => {
  let actions: Observable<Action>;
  let effects: SidebarStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SidebarStoreEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(SidebarStoreEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {a: SidebarStoreActions.init()});

      const expected = hot('-a-|', {
        a: SidebarStoreActions.loadSidebarStoreSuccess({sidebarStore: []})
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
