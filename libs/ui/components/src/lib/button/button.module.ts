import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {SpinnerModule} from '../spinner/spinner.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule {
}
