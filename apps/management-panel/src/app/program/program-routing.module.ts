import {NgModule, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgramCreateComponent} from './program-create/program-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {ProgramEditComponent} from './program-edit/program-edit.component';
import {ProgramShowComponent} from './program-show/program-show.component';
import {ProgramDocumentEditComponent} from './program-document/program-document-edit.component';
import {ModuleModule} from '../module/module.module';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: ProgramCreateComponent
  },
  {
    path: `:program_id/${NavigationRoutes.MODULE}`,
    loadChildren: (): Promise<Type<ModuleModule>> =>
      import('../module/module.module').then((m) => m.ModuleModule)
  },
  {
    path: `:program_id/${NavigationRoutes.EDIT}`,
    component: ProgramEditComponent
  },
  {
    path: `:program_id/${NavigationRoutes.DOCUMENT}/:document_id/${NavigationRoutes.EDIT}`,
    component: ProgramDocumentEditComponent
  },
  {
    path: ':program_id',
    component: ProgramShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
}
