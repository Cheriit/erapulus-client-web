import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './message.component';
import {MessageDirective} from './message.directive';
import {MessageIconComponent} from './message-icon.component';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';

@NgModule({
  declarations: [
    MessageComponent,
    MessageDirective,
    MessageIconComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiComponentsModule
  ],
  exports: [
    MessageComponent,
    MessageDirective
  ]
})
export class MessageModule {
}
