import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputErrorsComponent} from './input-errors.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [InputErrorsComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [InputErrorsComponent]
})
export class InputErrorsModule {
}
