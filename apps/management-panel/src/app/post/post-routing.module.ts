import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostCreateComponent} from './post-create/post-create.component';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostShowComponent} from './post-show/post-show.component';
import {PostListComponent} from './post-list/post-list.component';

const routes: Routes = [
  {
    path: `${NavigationRoutes.CREATE}`,
    component: PostCreateComponent
  },
  {
    path: `:post_id/${NavigationRoutes.EDIT}`,
    component: PostEditComponent
  },
  {
    path: ':post_id',
    component: PostShowComponent
  },
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
