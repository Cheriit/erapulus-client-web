import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlModule} from '../form-control/form-control.module';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlModule
  ],
  exports: [InputComponent]
})
export class InputModule {
}
