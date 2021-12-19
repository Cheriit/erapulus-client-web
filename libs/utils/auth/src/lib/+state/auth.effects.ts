import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {LocalStorageService} from '@erapulus/utils/local-storage';
import {AuthActions, signIn, signOut} from './auth.actions';
import {map, tap} from 'rxjs';
import {StringUtils} from '@erapulus/utils/helpers';

@Injectable({providedIn: 'root'})
export class AuthEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.INIT),
    map(() => {
      const userData = this.localStorageService.get('user');
      if (StringUtils.isEmpty(userData)) {
        return signOut();
      }
      return signIn({authData: JSON.parse(userData)});
    }))
  );

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(signIn),
    tap((val) => {
      this.localStorageService.set('user', val.authData);
    })
  ), {dispatch: false});

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SIGN_OUT),
    map(() => {
      this.localStorageService.remove('user');
      this.router.navigate([
        '/',
        'login'
      ]).then();
    })
  ), {dispatch: false});

  constructor (
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {
  }
}
