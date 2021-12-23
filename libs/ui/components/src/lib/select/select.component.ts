import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SelectAccessor, SelectItem} from './select.accessor';

@Component({
  selector: 'ep-select',
  template: `
    <ep-form-control [label]="label ? label : ''" [control]="control" [prefix]="errorPrefix">
      <div class="input" [class.error]="control.errors && control.touched">
        <ep-select-input [formControl]="control" (blur)="control.markAsTouched()"
                         (focus)="control.markAsUntouched()" [placeholder]="placeholder"
                         [accessor]="accessor"></ep-select-input>
      </div>
    </ep-form-control>
  `,
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() label?: string;
  @Input() staticItems?: SelectItem[];
  @Input() errorPrefix = 'common.forms.error.';
  @Input() accessor?: SelectAccessor;
}
