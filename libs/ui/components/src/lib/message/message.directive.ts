import {ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {MessageService} from './message.service';
import {Subscription, tap} from 'rxjs';
import {MessageComponent} from './message.component';

@Directive({
  selector: '[epMessage]'
})
export class MessageDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private lastComponent?: ComponentRef<MessageComponent<unknown>>;

  constructor (private viewContainerRef: ViewContainerRef, private messageService: MessageService) {
  }

  ngOnDestroy (): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit (): void {
    this.subscriptions.push(this.messageService.messages.subscribe((component) => {
      this.viewContainerRef.insert(component.hostView);
      this.lastComponent?.instance.closeMessage();
      this.subscriptions.push(component.instance.close.pipe(tap(() => component.destroy())).subscribe());
      this.lastComponent = component;
      component.changeDetectorRef.markForCheck();
    }));
  }
}
