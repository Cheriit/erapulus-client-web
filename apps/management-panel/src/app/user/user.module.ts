import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
import {UserListComponent} from './user-list/user-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {AdminUserListComponent} from './user-list/lists/admin-user-list.component';
import {UniversityAdminUserListComponent} from './user-list/lists/university-admin-user-list.component';
import {EmployeeUserListComponent} from './user-list/lists/employee-user-list.component';
import {StudentUserListComponent} from './user-list/lists/student-user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserShowComponent} from './user-show/user-show.component';

@NgModule({
  declarations: [
    AdminUserListComponent,
    UniversityAdminUserListComponent,
    EmployeeUserListComponent,
    StudentUserListComponent,
    UserComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserShowComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidebarLayoutModule,
    TableModule,
    UiComponentsModule,
    TranslateModule
  ]
})
export class UserModule {
}
