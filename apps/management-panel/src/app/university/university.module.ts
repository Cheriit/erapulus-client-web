import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UniversityRoutingModule} from './university-routing.module';
import {UniversityListComponent} from './university-list/university-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {UniversityTableComponent} from './university-list/university-table.component';
import {UniversityCreateComponent} from './university-create/university-create.component';
import {UniversityEditComponent} from './university-edit/university-edit.component';
import {UniversityShowComponent} from './university-show/university-show.component';
import {UniversityCreateFormComponent} from './university-create/university-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UniversityEditFormComponent} from './university-edit/university-edit-form.component';
import {MarkdownModule} from 'ngx-markdown';
import {UniversityEditLogoComponent} from './university-edit/university-edit-logo.component';
import {FileManagerModule} from '@erapulus/ui/file-manager';
import {UniversityFilesComponent} from './university-show/university-files.component';
import {UniversityDocumentEditComponent} from './university-document/university-document-edit.component';
import {UniversityDocumentEditFormComponent} from './university-document/university-document-edit-form.component';

@NgModule({
  declarations: [
    UniversityTableComponent,
    UniversityListComponent,
    UniversityCreateComponent,
    UniversityEditComponent,
    UniversityShowComponent,
    UniversityCreateFormComponent,
    UniversityEditFormComponent,
    UniversityEditLogoComponent,
    UniversityFilesComponent,
    UniversityDocumentEditComponent,
    UniversityDocumentEditFormComponent
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    MarkdownModule,
    FileManagerModule
  ]
})
export class UniversityModule {
}
