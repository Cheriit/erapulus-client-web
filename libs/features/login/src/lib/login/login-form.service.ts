import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService extends FormService {
  constructor (private formBuilder: FormBuilder) {
    super();
  }

  createForm (): FormGroup {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(32)
      ]),
      password: this.formBuilder.control('', [
        Validators.maxLength(32),
        Validators.required
      ])
    }, {updateOn: 'blur'});
    return this.form;
  }

  submitForm (): void {
    this.form?.markAsPending();
    this.form?.disable();
  }
}
