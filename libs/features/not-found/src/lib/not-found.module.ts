import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found.component';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';

export const notFoundRoutes: Route[] = [];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    UiComponentsModule
  ],
  exports: [NotFoundComponent]
})
export class NotFoundModule {
}
