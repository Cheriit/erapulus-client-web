import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface Error {
  key: string,
  params: unknown
}

@Component({
  selector: 'ep-input-errors',
  template: `
    <ng-container *ngIf="control.invalid && (control.dirty || control.touched) && control.enabled">
      <ng-container *ngFor="let error of getKeys();trackBy: trackByFn">
        <p class="error">{{(prefix + error.key | translate:error.params)}}</p>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./input-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorsComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() prefix!: string;

  constructor (private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit (): void {
    this.control.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  trackByFn (index: number, errorMsg: Error): Error {
    return errorMsg;
  }

  public getKeys (): Error[] {
    return this.control.errors && (this.control.touched || this.control.dirty) ? Object.entries(this.control.errors).map((value) => ({
      key: value[0],
      params: value[1]
    })) : [];
  }

}
