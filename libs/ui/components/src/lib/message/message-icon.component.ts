import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MessageType} from '@erapulus/ui/components';

@Component({
  selector: 'ep-message-icon',
  template: `
    <div class="flex items-center" [ngSwitch]="type">
      <svg *ngSwitchCase="messageType.ERROR" class="stroke-red-500 fill-red-500 stroke-3" width="31" height="31"
           viewBox="-1 -1 25 25"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM7.70711 15.7071L11 12.4142L14.2929 15.7071L15.7071 14.2929L12.4142 11L15.7071 7.70711L14.2929 6.29289L11 9.58579L7.70711 6.29289L6.29289 7.70711L9.58579 11L6.29289 14.2929L7.70711 15.7071Z"
        />
      </svg>
      <svg *ngSwitchCase="messageType.SUCCESS" class="stroke-green-500 fill-green-500 stroke-3" width="31" height="31"
           viewBox="-1 -1 25 25"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z"
        />
      </svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageIconComponent {
  @Input() type!: MessageType;
  public readonly messageType = MessageType;
}
