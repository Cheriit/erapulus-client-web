import {EventEmitter, Injectable, ViewContainerRef} from '@angular/core';
import {Message} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: EventEmitter<Message> = new EventEmitter<Message>();
  private viewContainerRef?: ViewContainerRef;

  public registerView (viewRef: ViewContainerRef): void {
    this.viewContainerRef = viewRef;
  }

  public renderMessage (message: Message): void {
    // If (ObjectUtils.isNotEmpty(this.viewContainerRef)) {
    //   Const component = this.viewContainerRef.createComponent(MessageComponent);
    //   Component.instance.title = message.title;
    //   Component.instance.content = message.content;
    //   If (message.type) {
    //     Component.instance.type = message.type;
    //   }
    //   Component.changeDetectorRef.markForCheck();
    // }
    this.messages.next(message);
  }
}
