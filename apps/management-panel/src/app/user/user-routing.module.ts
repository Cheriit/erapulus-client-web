import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserShowComponent} from './user-show/user-show.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';

const routes: Routes = [
  {
    path: '**',
    component: UserComponent,
    children: [
      {
        path: ':id',
        component: UserShowComponent,
        pathMatch: 'full'
      },
      {
        path: `:id/${NavigationRoutes.EDIT}`,
        component: UserEditComponent,
        pathMatch: 'full'
      },
      {
        path: `${NavigationRoutes.CREATE}/:type`,
        component: UserCreateComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        component: UserListComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
