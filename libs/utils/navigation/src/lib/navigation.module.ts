import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

export const navigationRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavigationModule {
}
