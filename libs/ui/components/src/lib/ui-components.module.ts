import {NgModule} from '@angular/core';
import {SnackbarModule} from './snackbar/snackbar.module';
import {ButtonModule} from './button/button.module';
import {ContainerModule} from './container/container.module';
import {FormControlModule} from './form-control/form-control.module';
import {InputModule} from './input/input.module';
import {LogoModule} from './logo/logo.module';
import {InputErrorsModule} from './input-error/input-errors.module';

const modules = [
  ButtonModule,
  ContainerModule,
  FormControlModule,
  InputModule,
  InputErrorsModule,
  LogoModule,
  SnackbarModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class UiComponentsModule {
}
