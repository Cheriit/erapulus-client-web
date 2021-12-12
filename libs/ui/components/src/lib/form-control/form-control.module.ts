import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlComponent} from './form-control.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputErrorsModule} from '../input-error/input-errors.module';

@NgModule({
  declarations: [FormControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputErrorsModule
  ],
  exports: [FormControlComponent]
})
export class FormControlModule {
}
