import {Action, createReducer, on} from '@ngrx/store';

import * as AuthActions from './auth.actions';
import {AUTH_FEATURE_KEY} from './auth.actions';
import jwtDecode from 'jwt-decode';
import {AuthUser, UserRole} from './auth.models';


export interface State {
  user?: AuthUser
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  user: undefined
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, (state, {authData}) => {
    const tokenData: { sub: string, ROLE: UserRole } = jwtDecode(authData.token);
    return {
      ...state,
      user: {
        token: authData.token,
        email: tokenData.sub,
        userId: authData.userId,
        role: tokenData.ROLE,
        universityId: authData.universityId
      }
    };
  }),
  on(AuthActions.signOut, () => ({
    user: undefined
  }))
);

export function reducer (state: State | undefined, action: Action): State {
  return authReducer(state, action);
}
