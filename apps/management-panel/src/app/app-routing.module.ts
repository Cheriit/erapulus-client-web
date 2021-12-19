import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarItem} from '@erapulus/ui/sidebar-layout';

export enum AppRoutes {
  DASHBOARD = ''
}

export const navItems: SidebarItem[] = [];

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
