import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarLayoutModule} from '@erapulus/ui/sidebar-layout';
import {WelcomeComponent} from './welcome.component';
import {WelcomeRoutingModule} from './welcome.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SidebarLayoutModule,
    TranslateModule,
    UiComponentsModule
  ]
})
export class WelcomeModule {
}
