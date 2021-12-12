import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-form-control',
  template: `
    <label>
      <p class="label">{{label}}</p>
      <ng-content></ng-content>
      <ep-input-errors [control]="control"></ep-input-errors>
    </label> `,
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent {
  @Input() label!: string;
  @Input() control!: FormControl;

  public trackByFn (index: number, item: string): string {
    return item;
  }
}
