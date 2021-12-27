import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FacultyRoutingModule} from './faculty-routing.module';
import {FacultyListComponent} from './faculty-list/faculty-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {FacultyCreateComponent} from './faculty-create/faculty-create.component';
import {FacultyEditComponent} from './faculty-edit/faculty-edit.component';
import {FacultyShowComponent} from './faculty-show/faculty-show.component';
import {FacultyCreateFormComponent} from './faculty-create/faculty-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FacultyEditFormComponent} from './faculty-edit/faculty-edit-form.component';
import {ProgramModule} from '../program/program.module';

@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyCreateComponent,
    FacultyEditComponent,
    FacultyShowComponent,
    FacultyCreateFormComponent,
    FacultyEditFormComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    ProgramModule
  ]
})
export class FacultyModule {
}
