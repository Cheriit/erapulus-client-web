import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModuleModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {UiComponentsModule} from '@erapulus/components';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModuleModule,
    UiComponentsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
