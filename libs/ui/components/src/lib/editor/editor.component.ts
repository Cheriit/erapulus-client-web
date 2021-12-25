import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-editor',
  template: `
    <ep-form-control [label]="label ? label : ''" [control]="control" [prefix]="errorPrefix">
      <div class="input" [class.error]="control.errors && control.touched">
        <textarea [formControl]="control"
                  [placeholder]="placeholder"
                  (blur)="control.markAsTouched()"
                  (focus)="control.markAsUntouched()"
        ></textarea>
        <markdown [data]="control.value" ngPreserveWhitespaces></markdown>
      </div>
    </ep-form-control>
  `,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @Input() control!: FormControl;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() errorPrefix = 'common.forms.error.';
}
