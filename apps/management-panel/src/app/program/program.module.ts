import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramRoutingModule} from './program-routing.module';
import {ProgramListComponent} from './program-list/program-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {ProgramCreateComponent} from './program-create/program-create.component';
import {ProgramEditComponent} from './program-edit/program-edit.component';
import {ProgramShowComponent} from './program-show/program-show.component';
import {ProgramCreateFormComponent} from './program-create/program-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProgramEditFormComponent} from './program-edit/program-edit-form.component';
import {MarkdownModule} from 'ngx-markdown';
import {FileManagerModule} from '@erapulus/ui/file-manager';
import {ProgramFilesComponent} from './program-show/program-files.component';
import {ProgramDocumentEditComponent} from './program-document/program-document-edit.component';
import {ProgramDocumentEditFormComponent} from './program-document/program-document-edit-form.component';

@NgModule({
  declarations: [
    ProgramListComponent,
    ProgramCreateComponent,
    ProgramEditComponent,
    ProgramShowComponent,
    ProgramCreateFormComponent,
    ProgramEditFormComponent,
    ProgramFilesComponent,
    ProgramDocumentEditComponent,
    ProgramDocumentEditFormComponent
  ],
  exports: [ProgramListComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    MarkdownModule,
    FileManagerModule
  ]
})
export class ProgramModule {
}
