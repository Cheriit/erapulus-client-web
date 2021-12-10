import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/angular';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.init, {
      run: (
        action: ReturnType<typeof AuthActions.init>,
        state: AuthFeature.AuthPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return AuthActions.loadAuthSuccess({auth: []});
      },
      onError: (action: ReturnType<typeof AuthActions.init>, error) => {
        console.error('Error', error);
        return AuthActions.loadAuthFailure({error});
      }
    })
  );

  constructor (
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<AuthFeature.AuthPartialState>
  ) {
  }
}
