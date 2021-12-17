import {ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {MessageService} from './message.service';
import {Subscription, tap} from 'rxjs';
import {MessageComponent} from './message.component';

@Directive({
  selector: '[epMessage]'
})
export class MessageDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private lastComponent?: ComponentRef<MessageComponent>;

  constructor (private viewContainerRef: ViewContainerRef, private messageService: MessageService) {
  }

  ngOnDestroy (): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit (): void {
    this.subscriptions.push(this.messageService.messages.subscribe((message) => {
      const component = this.viewContainerRef.createComponent(MessageComponent);
      component.instance.title = message.title;
      component.instance.content = message.content;
      if (message.type !== undefined) {
        component.instance.type = message.type;
      }
      component.instance.close.pipe(tap(() => component.destroy())).subscribe();
      this.subscriptions.push();
      this.lastComponent = component;
      component.changeDetectorRef.markForCheck();
    }));
  }
}
