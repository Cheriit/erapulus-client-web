import {NgModule, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlModule} from '../form-control/form-control.module';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE
    })
  ],
  exports: [EditorComponent]
})
export class EditorModule {
}
