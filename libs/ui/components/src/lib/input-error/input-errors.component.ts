import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export interface Error {
  key: string,
  params: unknown
}

@Component({
  selector: 'ep-input-errors',
  template: `
    <ng-container *ngIf="control.enabled && control.touched">
      <ng-container *ngFor="let error of getKeys();trackBy: trackByFn">
        <p class="error">{{(prefix + error.key | translate:error.params)}}</p>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent {
  @Input() control!: FormControl;
  @Input() prefix!: string;
  public errors: Observable<string[]> = new Observable<string[]>();

  constructor (private changeDetectorRef: ChangeDetectorRef) {
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
