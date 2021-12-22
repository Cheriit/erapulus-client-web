import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './auth.reducer';
import {AUTH_FEATURE_KEY} from './auth.actions';

export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getAuthUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

export const getAuthRole = createSelector(
  getAuthState,
  (state: State) => state.user?.role
);

export const getAuthToken = createSelector(
  getAuthState,
  (state: State) => state.user?.token
);
