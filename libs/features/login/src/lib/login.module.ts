import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModuleModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';
import {ReactiveFormsModule} from '@angular/forms';
import {ErapulusDataAccessModule} from '@erapulus/data-access/erapulus';
import {AuthModule} from '@erapulus/utils/auth';

@NgModule({
  imports: [
    ErapulusDataAccessModule,
    CommonModule,
    LoginRoutingModuleModule,
    UiComponentsModule,
    TranslateModule,
    UiComponentsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
