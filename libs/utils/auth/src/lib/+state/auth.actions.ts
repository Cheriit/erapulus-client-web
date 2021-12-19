import {createAction, props} from '@ngrx/store';
import {SignInResponse} from './auth.models';

export const AUTH_FEATURE_KEY = '[Auth]';

export const AuthActions = {
  INIT: `${AUTH_FEATURE_KEY} Init`,
  SIGN_IN: `${AUTH_FEATURE_KEY} Sign in to app`,
  SIGN_OUT: `${AUTH_FEATURE_KEY} Sign out from app`
};

export const init = createAction(AuthActions.INIT);

export const signIn = createAction(
  AuthActions.SIGN_IN,
  props<{ authData: SignInResponse }>()
);

export const signOut = createAction(
  AuthActions.SIGN_OUT
);
