import {NgModule} from '@angular/core';
import {SnackbarModule} from './snackbar/snackbar.module';
import {ButtonModule} from './button/button.module';
import {ContainerModule} from './container/container.module';
import {FormControlModule} from './form-control/form-control.module';
import {InputModule} from './input/input.module';
import {LogoModule} from './logo/logo.module';
import {InputErrorsModule} from './input-error/input-errors.module';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {LanguageSelectorModule} from './language-selector/language-selector.module';
import {HeaderModule} from './header/header.module';
import {TextModule} from './text/text.module';

const modules = [
  ButtonModule,
  ContainerModule,
  FormControlModule,
  HeaderModule,
  InputModule,
  InputErrorsModule,
  LanguageSelectorModule,
  LogoModule,
  SnackbarModule,
  TextModule
];

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [...modules],
  exports: [...modules]
})
export class UiComponentsModule {
}
