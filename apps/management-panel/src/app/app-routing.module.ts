import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export enum AppRoutes {
  DASHBOARD = ''
}

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
