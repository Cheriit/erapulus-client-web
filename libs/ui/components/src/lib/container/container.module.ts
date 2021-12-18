import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContainerComponent} from './container.component';
import {SpinnerModule} from '../spinner/spinner.module';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [ContainerComponent]
})
export class ContainerModule {
}
