import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {LoginModule} from '@erapulus/features/login';
import {EffectsModule} from '@ngrx/effects';
import {AppRoutingModule} from './app-routing.module';
import {UiComponentsModule} from '@erapulus/ui/components';
import {AppSidebarService} from './app-sidebar.service';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslationsModule} from '@erapulus/utils/translations';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundModule} from '@erapulus/features/NotFound';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    TranslationsModule,
    HttpClientModule,
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    LoginModule,
    NotFoundModule,
    UiComponentsModule
  ],
  providers: [
    {
      provide: 'SIDEBAR_SERVICE',
      useClass: AppSidebarService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
