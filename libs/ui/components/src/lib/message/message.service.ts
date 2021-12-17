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
    this.messages.next(message);
  }
}
