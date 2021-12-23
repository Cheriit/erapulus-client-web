import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

export abstract class FormService<T> {

  protected form?: FormGroup;

  public getControl (control: string): FormControl {
    return this.form?.get(control) as FormControl;
  }

  abstract createForm(...args: unknown[]): FormGroup

  abstract submitForm(): Observable<T> | null
}
