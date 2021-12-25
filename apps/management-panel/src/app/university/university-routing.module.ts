import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UniversityCreateComponent} from './university-create/university-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UniversityEditComponent} from './university-edit/university-edit.component';
import {UniversityShowComponent} from './university-show/university-show.component';
import {UniversityListComponent} from './university-list/university-list.component';
import {UniversityGuard} from './university.guard';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: UniversityCreateComponent
  },
  {
    path: `:university_id/${NavigationRoutes.EDIT}`,
    canActivate: [UniversityGuard],
    component: UniversityEditComponent
  },
  {
    path: ':university_id',
    canActivate: [UniversityGuard],
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
