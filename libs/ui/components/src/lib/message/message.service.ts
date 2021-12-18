import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';
import {Message} from './message.model';
import {MessageComponent} from './message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: EventEmitter<ComponentRef<MessageComponent<unknown>>> = new EventEmitter<ComponentRef<MessageComponent<unknown>>>();
  private viewContainerRef?: ViewContainerRef;

  constructor (private resolver: ComponentFactoryResolver, private injector: Injector) {
  }


  public registerView (viewRef: ViewContainerRef): void {
    this.viewContainerRef = viewRef;
  }

  public generateMessage<T> (message: Message<T>): ComponentRef<MessageComponent<T>> {
    const component = this.resolver.resolveComponentFactory(MessageComponent).create(this.injector) as ComponentRef<MessageComponent<T>>;
    component.instance.title = message.title;
    if (message.content !== undefined) {
      component.instance.content = message.content;
    } else if (message.component !== undefined) {
      component.instance.component = this.resolver.resolveComponentFactory(message.component).create(this.injector);
    }
    if (message.type !== undefined) {
      component.instance.type = message.type;
    }
    if (message.hasClose !== undefined) {
      component.instance.hasClose = message.hasClose;
    }
    this.messages.next(component);
    return component;
  }
}
