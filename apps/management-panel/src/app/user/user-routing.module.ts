import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreateComponent} from './user-create/user-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserShowComponent} from './user-show/user-show.component';
import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}/:type`,
    component: UserCreateComponent
  },
  {
    path: `:id/${NavigationRoutes.EDIT}`,
    component: UserEditComponent
  },
  {
    path: ':id',
    component: UserShowComponent
  },
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
