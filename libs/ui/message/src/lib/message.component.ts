import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MessageType} from './message.model';

@Component({
  selector: 'ep-message',
  template: `
    <div class="absolute top-0 left-0 w-full p-4 overflow-x-hidden z-40">
      <div
        class="bg-white rounded-lg border-gray-300 border p-4 shadow-lg w-full max-w-5xl m-auto fadeIn origin-top-left"
        [class.fadeOut]="exiting">
        <div class="flex flex-row items-center">
          <ep-message-icon [type]="type" class="flex items-center"></ep-message-icon>
          <div class="grow mx-4 min-w-0">
            <p class="font-semibold mb-2 truncate">{{title | translate}}</p>
            <ng-container *ngIf="component !== undefined; else content">
              <ng-template #contentPlaceholder></ng-template>
            </ng-container>
            <ng-template #content>
              <p class="text-gray-500 truncate" *ngIf="getSingleContent(); else contentList">{{getSingleContent()}}</p>
              <ng-template #contentList>
                <ul class="list-disc text-gray-500 list-inside">
                  <li *ngFor="let message of getContentList()" class="truncate">{{message}}</li>
                </ul>
              </ng-template>
            </ng-template>
          </div>
          <img (click)="closeMessage()"
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
export class MessageComponent<T> implements OnInit, OnDestroy {
  @Input() type: MessageType = MessageType.ERROR;
  @Input() title!: string;
  @Input() content?: string | string[];
  @Input() component?: ComponentRef<T>;
  @Input() hasClose = true;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('contentPlaceholder', {read: ViewContainerRef, static: true}) contentPlaceholderRef!: ViewContainerRef;
  public exiting = false;

  public closeMessage (): void {
    this.exiting = true;
    setTimeout(() => this.close.next(), 200);
  }

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

  public getContentList (): string[] {
    if (this.content && typeof this.content !== 'string') {
      return this.content;
    }
    return [];
  }

  ngOnInit (): void {
    if (this.component !== undefined) {
      this.contentPlaceholderRef.clear();
      this.contentPlaceholderRef.insert(this.component.hostView);
    }
  }

  ngOnDestroy (): void {
    this.component?.destroy();
  }
}
