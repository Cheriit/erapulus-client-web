import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-form-control',
  template: `
    <label>
      <p class="label">{{label | translate}}</p>
      <ng-content></ng-content>
      <ep-input-errors [control]="control" [prefix]="prefix"></ep-input-errors>
    </label> `,
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() prefix = 'common.forms.error.';

  public trackByFn (index: number, item: string): string {
    return item;
  }

}
