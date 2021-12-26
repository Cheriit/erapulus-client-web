import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

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
    <button class="button hover:-translate-y-0.5 hover:scale-105" [class.loading]="isLoading() || disabled"
            [disabled]="isLoading() || disabled" [class]="type" (click)="onClickEvent($event)"
            [type]="submit ? 'submit' : 'button'">
      <ng-container *ngIf="!isLoading()">
        <ng-content select="[icon]"></ng-content>
      </ng-container>
      <div *ngIf="isLoading()" class="loader">
        <ep-spinner></ep-spinner>
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
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public readonly click: EventEmitter<void> = new EventEmitter<void>();
  @Input() public type: ButtonType = ButtonType.PRIMARY;
  @Input() public animationType?: AnimationType = undefined;
  @Input() public disabled = false;
  @Input() public submit = false;

  onClickEvent (event: MouseEvent): void {
    if (event && !this.isLoading()) {
      event.stopPropagation();
      this.click.emit();
    }
  }

  public isPinging (): boolean {
    return this.animationType === AnimationType.PING;
  }

  public isLoading (): boolean {
    return this.animationType === AnimationType.LOADING;
  }
}
