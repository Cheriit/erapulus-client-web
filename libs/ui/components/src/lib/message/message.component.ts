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
    <div class="absolute top-0 left-0 w-full p-4 overflow-x-hidden z-50">
      <div
        class="bg-white rounded-lg border-gray-300 border p-4 shadow-lg w-full max-w-5xl m-auto fadeIn origin-top-left"
        [class.fadeOut]="exiting">
        <div class="flex flex-row">
          <ep-message-icon [type]="type" class="flex items-center"></ep-message-icon>
          <div class="grow mx-4">
            <p class="font-semibold mb-2">{{title | translate}}</p>
            <ng-container *ngIf="component !== undefined; else content">
              <ng-template #contentPlaceholder></ng-template>
            </ng-container>
            <ng-template #content>
              <p class="text-gray-500" *ngIf="getSingleContent(); else contentList">{{getSingleContent()}}</p>
              <ng-template #contentList>
                <ul class="list-disc text-gray-500 list-inside">
                  <li *ngFor="let message of getContentList()">{{message}}</li>
                </ul>
              </ng-template>
            </ng-template>
          </div>
          <div (click)="closeMessage()" class="flex items-center cursor-pointer" *ngIf="hasClose">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill="black" fill-opacity="0.54"/>
            </svg>
          </div>
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
