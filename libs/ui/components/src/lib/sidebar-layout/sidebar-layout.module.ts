import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarLayoutComponent} from './sidebar-layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarItemComponent} from './sidebar-item/sidebar-item.component';
import {NavbarComponent} from './navbar/navbar.component';
import {StoreModule} from '@ngrx/store';
import * as fromSidebarStore from './+state/sidebar.reducer';
import {SidebarFacade} from './+state/sidebar.facade';
import {LogoModule} from '../logo/logo.module';
import {TextModule} from '../text/text.module';
import {SIDEBAR_FEATURE_KEY} from './+state/sidebar.actions';

const components = [
  NavbarComponent,
  SidebarComponent,
  SidebarItemComponent,
  SidebarLayoutComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      SIDEBAR_FEATURE_KEY,
      fromSidebarStore.reducer
    ),
    LogoModule,
    TextModule
  ],
  exports: [...components],
  providers: [SidebarFacade]
})
export class SidebarLayoutModule {
}
