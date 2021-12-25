import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UniversityCreateComponent} from './university-create/university-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UniversityEditComponent} from './university-edit/university-edit.component';
import {UniversityShowComponent} from './university-show/university-show.component';
import {UniversityListComponent} from './university-list/university-list.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: UniversityCreateComponent
  },
  {
    path: `:id/${NavigationRoutes.EDIT}`,
    component: UniversityEditComponent
  },
  {
    path: ':id',
    component: UniversityShowComponent
  },
  {
    path: '',
    component: UniversityListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityRoutingModule {
}
