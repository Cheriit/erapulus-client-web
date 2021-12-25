import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSectionComponent} from './form-section.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputErrorsModule} from '../input-error/input-errors.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderModule} from '../header/header.module';
import {TextModule} from '../text/text.module';

@NgModule({
  declarations: [FormSectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputErrorsModule,
    TranslateModule,
    HeaderModule,
    TextModule
  ],
  exports: [FormSectionComponent]
})
export class FormSectionModule {
}
