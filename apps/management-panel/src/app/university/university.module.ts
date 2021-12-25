import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UniversityRoutingModule} from './university-routing.module';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
import {UniversityListComponent} from './university-list/university-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {UniversityTableComponent} from './university-list/university-table.component';
import {UniversityCreateComponent} from './user-create/university-create.component';
import {UniversityEditComponent} from './user-edit/university-edit.component';
import {UniversityShowComponent} from './user-show/university-show.component';
import {UserCreateFormComponent} from './user-create/user-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserEditFormComponent} from './user-edit/user-edit-form.component';
import {UserShowDetailsComponent} from './user-show/user-show-details.component';

@NgModule({
  declarations: [
    UniversityTableComponent,
    UniversityListComponent,
    UniversityCreateComponent,
    UniversityEditComponent,
    UniversityShowComponent,
    UserCreateFormComponent,
    UserEditFormComponent,
    UserShowDetailsComponent
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
