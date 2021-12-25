import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UniversityRoutingModule} from './university-routing.module';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
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
import {UniversityShowDetailsComponent} from './university-show/university-show-details.component';

@NgModule({
  declarations: [
    UniversityTableComponent,
    UniversityListComponent,
    UniversityCreateComponent,
    UniversityEditComponent,
    UniversityShowComponent,
    UniversityCreateFormComponent,
    UniversityEditFormComponent,
    UniversityShowDetailsComponent
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    SidebarLayoutModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class UniversityModule {
}
