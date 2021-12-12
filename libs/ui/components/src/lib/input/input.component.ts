import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-input',
  template: `
    <ep-form-control [label]="label ? label : ''" [control]="control" [prefix]="errorPrefix">
      <div class="input" [class.error]="control.errors && control.dirty && control.touched">
        <input [formControl]="control" [placeholder]="placeholder" (blur)="control.markAsTouched()"
               (focus)="control.markAsUntouched()"/>
      </div>
    </ep-form-control>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

  @Input() control!: FormControl;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() errorPrefix = 'common.forms.error.';
}
