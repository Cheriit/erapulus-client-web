import {NgModule} from '@angular/core';
import {MessageModule} from './message/message.module';
import {ButtonModule} from './button/button.module';
import {ContainerModule} from './container/container.module';
import {FormControlModule} from './form-control/form-control.module';
import {InputModule} from './input/input.module';
import {LogoModule} from './logo/logo.module';
import {InputErrorsModule} from './input-error/input-errors.module';
import {HeaderModule} from './header/header.module';
import {TextModule} from './text/text.module';
import {SidebarLayoutModule} from './sidebar-layout/sidebar-layout.module';
import {SpinnerModule} from './spinner/spinner.module';

const modules = [
  ButtonModule,
  ContainerModule,
  FormControlModule,
  HeaderModule,
  InputModule,
  InputErrorsModule,
  LogoModule,
  MessageModule,
  SidebarLayoutModule,
  SpinnerModule,
  TextModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class UiComponentsModule {
}
