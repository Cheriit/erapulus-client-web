import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
import {WelcomeComponent} from './welcome.component';
import {WelcomeRoutingModule} from './welcome.routing.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SidebarLayoutModule
  ]
})
export class WelcomeModule {
}
