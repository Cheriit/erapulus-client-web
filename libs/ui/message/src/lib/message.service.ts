import {ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Injector} from '@angular/core';
import {Message} from './message.model';
import {MessageComponent} from './message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: EventEmitter<ComponentRef<MessageComponent>> = new EventEmitter<ComponentRef<MessageComponent>>();

  constructor (private resolver: ComponentFactoryResolver, private injector: Injector) {
  }

  public generateMessage (message: Message): ComponentRef<MessageComponent> {
    const component = this.resolver.resolveComponentFactory(MessageComponent).create(this.injector) as ComponentRef<MessageComponent>;
    component.instance.title = message.title;
    if (message.content !== undefined) {
      component.instance.content = message.content;
    }
    if (message.type !== undefined) {
      component.instance.type = message.type;
    }
    if (message.hasClose !== undefined) {
      component.instance.hasClose = message.hasClose;
    }
    if (message.hasButtons !== undefined) {
      component.instance.hasButtons = message.hasButtons;
    }
    this.messages.next(component);
    return component;
  }
}
