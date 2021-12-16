import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModuleModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModuleModule,
    UiComponentsModule,
    TranslateModule,
    UiComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
