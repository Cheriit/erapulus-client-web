import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class SubscriptionManagerService {
  private subscriptions: Subscription[] = [];

  public subscribe (subscription: Subscription): Subscription {
    this.subscriptions.push(subscription);
    return subscription;
  }

  unsubscribeAll (): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
