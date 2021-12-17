import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Event} from '@angular/router';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export enum AnimationType {
  LOADING = 'loading',
  PING = 'ping'
}


@Component({
  selector: 'ep-button',
  template: `
    <button class="button hover:-translate-y-1 hover:scale-105" [class.loading]="isLoading() || disabled"
            [disabled]="isLoading() || disabled">
      <ng-container *ngIf="!isLoading()">
        <ng-content select="[icon]"></ng-content>
      </ng-container>
      <div *ngIf="isLoading()" class="loader">
        <div
          class="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
        </div>
      </div>
      <ng-content></ng-content>
      <div *ngIf="isPinging()" class="ping">
        <span class="animation"></span>
        <span class="dot"></span>
      </div>
    </button> `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() public readonly click: EventEmitter<void> = new EventEmitter<void>();
  @Input() public type: ButtonType = ButtonType.PRIMARY;
  @Input() public animationType?: AnimationType = undefined;
  @Input() public disabled = false;

  @HostListener('click', ['$event']) onClickEvent (event: Event): void {
    if (event && !this.isLoading())
      this.click.emit();
  }

  public isPinging (): boolean {
    return this.animationType === AnimationType.PING;
  }

  public isLoading (): boolean {
    return this.animationType === AnimationType.LOADING;
  }
}
