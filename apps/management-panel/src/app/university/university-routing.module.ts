import {NgModule, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UniversityCreateComponent} from './university-create/university-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UniversityEditComponent} from './university-edit/university-edit.component';
import {UniversityShowComponent} from './university-show/university-show.component';
import {UniversityListComponent} from './university-list/university-list.component';
import {UniversityGuard} from './university.guard';
import {FacultyModule} from '../faculty/faculty.module';
import {BuildingModule} from '../building/building.module';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: UniversityCreateComponent
  },
  {
    path: `:university_id/${NavigationRoutes.FACULTY}`,
    canActivate: [UniversityGuard],
    loadChildren: (): Promise<Type<FacultyModule>> =>
      import('../faculty/faculty.module').then((m) => m.FacultyModule)
  },
  {
    path: `:university_id/${NavigationRoutes.BUILDING}`,
    canActivate: [UniversityGuard],
    loadChildren: (): Promise<Type<BuildingModule>> =>
      import('../building/building.module').then((m) => m.BuildingModule)
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
