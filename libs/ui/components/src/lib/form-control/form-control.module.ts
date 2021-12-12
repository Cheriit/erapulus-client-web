import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlComponent} from './form-control.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputErrorsModule} from '../input-error/input-errors.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [FormControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputErrorsModule,
    TranslateModule
  ],
  exports: [FormControlComponent]
})
export class FormControlModule {
}
