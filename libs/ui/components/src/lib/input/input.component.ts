import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-input',
  template: `
    <ep-form-control [label]="label ? label : ''" [control]="control" [prefix]="errorPrefix">
      <div class="input" [class.error]="control.errors && control.touched">
        <input [formControl]="control" [placeholder]="placeholder ?? ''" (blur)="control.markAsTouched()"
               (focus)="control.markAsUntouched()" [type]="type"
               [attr.value]="control.value"
               [attr.disabled]=" control.disabled ? '' : null"/>
      </div>
    </ep-form-control>
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() errorPrefix = 'common.forms.error.';
  @Input() type = 'text';

}
