import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostListComponent} from './post-list/post-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostShowComponent} from './post-show/post-show.component';
import {PostCreateFormComponent} from './post-create/post-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PostEditFormComponent} from './post-edit/post-edit-form.component';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostEditComponent,
    PostShowComponent,
    PostCreateFormComponent,
    PostEditFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    MarkdownModule
  ]
})
export class PostModule {
}
