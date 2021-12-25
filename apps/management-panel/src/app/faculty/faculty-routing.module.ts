import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FacultyCreateComponent} from './faculty-create/faculty-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {FacultyEditComponent} from './faculty-edit/faculty-edit.component';
import {FacultyShowComponent} from './faculty-show/faculty-show.component';
import {FacultyListComponent} from './faculty-list/faculty-list.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: FacultyCreateComponent
  },
  {
    path: `:faculty_id/${NavigationRoutes.EDIT}`,
    component: FacultyEditComponent
  },
  {
    path: ':faculty_id',
    component: FacultyShowComponent
  },
  {
    path: '',
    component: FacultyListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule {
}
