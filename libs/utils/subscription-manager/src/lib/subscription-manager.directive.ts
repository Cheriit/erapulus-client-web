import {Directive, OnDestroy} from '@angular/core';
import {SubscriptionManagerService} from './subscription-manager.service';

@Directive({
  selector: '[epSubscriptionManager]',
  providers: [SubscriptionManagerService]
})
export class SubscriptionManagerDirective implements OnDestroy {
  constructor (private subscriptionManagerService: SubscriptionManagerService) {
  }

  ngOnDestroy (): void {
    this.subscriptionManagerService.unsubscribeAll();
  }
}
