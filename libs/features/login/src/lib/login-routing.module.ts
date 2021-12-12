import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const loginRoutes: Route[] = [{path: 'login', component: LoginComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginRoutingModuleModule {
}
