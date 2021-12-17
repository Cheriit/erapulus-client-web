import {SubscriptionManagerDirective} from './subscription-manager.directive';
import {SubscriptionManagerService} from './subscription-manager.service';

describe('SubscriptionManagerDirective', () => {
  it('should create an instance', () => {
    const directive = new SubscriptionManagerDirective(new SubscriptionManagerService());
    expect(directive).toBeTruthy();
  });
});
