import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageAction, MessageType} from './message.model';
import {ButtonType} from '@erapulus/ui/components';

@Component({
  selector: 'ep-message',
  template: `
    <div class="absolute top-0 left-0 w-full p-4 overflow-x-hidden z-40 cont">
      <div
        class="bg-white rounded-lg border-gray-300 border p-4 shadow-lg w-full max-w-5xl m-auto fadeIn origin-top-left"
        [class.fadeOut]="exiting">
        <div class="flex flex-row items-center">
          <div class="h-full">
            <ep-message-icon [type]="type" class="flex items-center"></ep-message-icon>

          </div>
          <div class="grow mx-4 min-w-0">
            <p class="font-semibold mb-2 truncate">{{title | translate}}</p>
            <p class="text-gray-500 truncate"
               *ngIf="getSingleContent(); else contentList">{{getSingleContent() || '' | translate}}</p>
            <ng-template #contentList>
              <ul class="list-disc text-gray-500 list-inside">
                <li *ngFor="let message of getContentList()" class="truncate">{{message | translate}}</li>
              </ul>
            </ng-template>
            <div class="flex justify-around w-100 m-5" *ngIf="hasButtons">
              <ep-button (click)="emitAction(messageAction.CANCEL)"
                         [type]="buttonType.SECONDARY">{{'common.message.action.cancel' | translate}}</ep-button>
              <ep-button
                (click)="emitAction(messageAction.ACCEPT)">{{'common.message.action.accept' | translate}}</ep-button>
            </div>

          </div>
          <img (click)="emitAction(messageAction.CLOSE)"
               alt="Close"
               class="cursor-pointer w-5 h-5 hover:scale-125 transition-transform"
               src="/assets/icons/crossbar.svg" *ngIf="hasClose"/>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  @Input() type: MessageType = MessageType.ERROR;
  @Input() title!: string;
  @Input() content?: string | string[];
  @Input() hasClose = true;
  @Input() hasButtons = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly action: EventEmitter<MessageAction> = new EventEmitter<MessageAction>();
  public exiting = false;
  public buttonType = ButtonType;
  public messageAction = MessageAction;

  public getSingleContent (): string | null {
    if (this.content) {
      if (typeof this.content === 'string') {
        return this.content;
      } else if (this.content.length === 1) {
        return this.content[0];
      }
    }
    return null;
  }

  public emitAction (actionType: MessageAction): void {
    this.exiting = true;
    setTimeout(() => this.action.next(actionType), 2000);
  }

  public getContentList (): string[] {
    if (this.content && typeof this.content !== 'string') {
      return this.content;
    }
    return [];
  }
}
