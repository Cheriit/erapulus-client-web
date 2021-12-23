import {NgModule, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInUserGuard} from '@erapulus/utils/auth';
import {UserModule} from './user/user.module';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {WelcomeModule} from './welcome/welcome.module';
import {NotFoundComponent} from '@erapulus/features/NotFound';
import {AppMainComponent} from './app-main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NavigationRoutes.WELCOME
  },
  {
    path: '',
    canActivate: [LoggedInUserGuard],
    component: AppMainComponent,
    children: [
      {
        path: 'welcome',
        canActivate: [LoggedInUserGuard],
        pathMatch: 'full',
        loadChildren: (): Promise<Type<WelcomeModule>> =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule)
      },
      {
        path: `${NavigationRoutes.USER}`,
        canActivate: [LoggedInUserGuard],
        loadChildren: (): Promise<Type<UserModule>> =>
          import('./user/user.module').then((m) => m.UserModule)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
