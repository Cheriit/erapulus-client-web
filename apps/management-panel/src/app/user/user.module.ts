import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
import {UserListComponent} from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidebarLayoutModule
  ]
})
export class UserModule {
}
