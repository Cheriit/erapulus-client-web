import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModuleRoutingModule} from './module-routing.module';
import {ModuleListComponent} from './module-list/module-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {ModuleCreateComponent} from './module-create/module-create.component';
import {ModuleEditComponent} from './module-edit/module-edit.component';
import {ModuleShowComponent} from './module-show/module-show.component';
import {ModuleCreateFormComponent} from './module-create/module-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleEditFormComponent} from './module-edit/module-edit-form.component';
import {MarkdownModule} from 'ngx-markdown';
import {FileManagerModule} from '@erapulus/ui/file-manager';
import {ModuleFilesComponent} from './module-show/module-files.component';
import {ModuleDocumentEditComponent} from './module-document/module-document-edit.component';
import {ModuleDocumentEditFormComponent} from './module-document/module-document-edit-form.component';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleCreateComponent,
    ModuleEditComponent,
    ModuleShowComponent,
    ModuleCreateFormComponent,
    ModuleEditFormComponent,
    ModuleFilesComponent,
    ModuleDocumentEditComponent,
    ModuleDocumentEditFormComponent
  ],
  exports: [ModuleListComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    MarkdownModule,
    FileManagerModule
  ]
})
export class ModuleModule {
}
