import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildingCreateComponent} from './building-create/building-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {BuildingEditComponent} from './building-edit/building-edit.component';
import {BuildingShowComponent} from './building-show/building-show.component';
import {BuildingListComponent} from './building-list/building-list.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: BuildingCreateComponent
  },
  {
    path: `:building_id/${NavigationRoutes.EDIT}`,
    component: BuildingEditComponent
  },
  {
    path: ':building_id',
    component: BuildingShowComponent
  },
  {
    path: '',
    component: BuildingListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule {
}
