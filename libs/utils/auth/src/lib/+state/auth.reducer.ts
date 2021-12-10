import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as AuthActions from './auth.actions';
import {AuthEntity} from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<AuthEntity> {
  selectedId?: string | number; // Which Auth record has been selected
  loaded: boolean; // Has the Auth list been loaded
  error?: string | null; // Last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

export const initialState: State = authAdapter.getInitialState({
  // Set initial required properties
  loaded: false
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({...state, loaded: false, error: null})),
  on(AuthActions.loadAuthSuccess, (state, {auth}) =>
    authAdapter.setAll(auth, {...state, loaded: true})
  ),
  on(AuthActions.loadAuthFailure, (state, {error}) => ({...state, error}))
);

export function reducer (state: State | undefined, action: Action) {
  return authReducer(state, action);
}
