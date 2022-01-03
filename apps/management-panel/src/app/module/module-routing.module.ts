import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModuleCreateComponent} from './module-create/module-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {ModuleEditComponent} from './module-edit/module-edit.component';
import {ModuleShowComponent} from './module-show/module-show.component';
import {ModuleDocumentEditComponent} from './module-document/module-document-edit.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: ModuleCreateComponent
  },
  {
    path: `:module_id/${NavigationRoutes.EDIT}`,
    component: ModuleEditComponent
  },
  {
    path: `:module_id/${NavigationRoutes.DOCUMENT}/:document_id/${NavigationRoutes.EDIT}`,
    component: ModuleDocumentEditComponent
  },
  {
    path: ':module_id',
    component: ModuleShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule {
}
