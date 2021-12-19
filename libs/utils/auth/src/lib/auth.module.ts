import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import {AuthEffects} from './+state/auth.effects';
import {AuthFacade} from './+state/auth.facade';
import {AUTH_FEATURE_KEY} from './+state/auth.actions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthFacade]
})
export class AuthModule {
}
