import {FormControl, FormGroup} from '@angular/forms';

export abstract class FormService {

  protected form?: FormGroup;

  public getControl (control: string): FormControl {
    return this.form?.get(control) as FormControl;
  }

  abstract createForm(...args: unknown[]): FormGroup

  abstract submitForm(): void
}
