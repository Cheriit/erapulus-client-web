import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {LoginModule} from '@erapulus/features/login';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {TranslationsModule} from '@erapulus/utils/translations';
import {UiComponentsModule} from '@erapulus/ui/components';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from './app-main.component';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{path: '**', component: AppMainComponent}]),
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([]),
    TranslationsModule,
    AppRoutingModule,
    LoginModule,
    UiComponentsModule,
    SidebarLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
