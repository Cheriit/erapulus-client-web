import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route} from '@angular/router';
import {SubscriptionManagerDirective} from './subscription-manager.directive';

export const subscriptionManagerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule],
  declarations: [SubscriptionManagerDirective],
  exports: [SubscriptionManagerDirective]
})
export class SubscriptionManagerModule {
}
