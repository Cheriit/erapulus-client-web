import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from './select-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectComponent} from './select.component';
import {FormControlModule} from '../form-control/form-control.module';
import {TextModule} from '../text/text.module';
import {TranslateModule} from '@ngx-translate/core';
import {SpinnerModule} from '../spinner/spinner.module';

@NgModule({
  declarations: [
    SelectInputComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlModule,
    TextModule,
    TranslateModule,
    SpinnerModule
  ],
  exports: [
    SelectInputComponent,
    SelectComponent
  ]
})
export class SelectModule {
}
