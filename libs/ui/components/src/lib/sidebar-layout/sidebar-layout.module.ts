import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarLayoutComponent} from './sidebar-layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarItemComponent} from './sidebar-item/sidebar-item.component';
import {NavbarComponent} from './navbar/navbar.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromSidebarStore from './+state/sidebar-store.reducer';
import {SidebarStoreEffects} from './+state/sidebar-store.effects';
import {SidebarStoreFacade} from './+state/sidebar-store.facade';
import {LogoModule} from '../logo/logo.module';
import {TextModule} from '../text/text.module';

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
      fromSidebarStore.SIDEBARSTORE_FEATURE_KEY,
      fromSidebarStore.reducer
    ),
    EffectsModule.forFeature([SidebarStoreEffects]),
    LogoModule,
    TextModule
  ],
  exports: [...components],
  providers: [SidebarStoreFacade]
})
export class SidebarLayoutModule {
}
