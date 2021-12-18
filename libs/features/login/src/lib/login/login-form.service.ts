import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginDataAccessService, LoginRequestParams, LoginResponseParams} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'any'
})
export class LoginFormService extends FormService {
  protected form?: FormGroup;

  constructor (private formBuilder: FormBuilder, private loginDataAccessService: LoginDataAccessService) {
    super();
  }

  createForm (): FormGroup {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.minLength(2),
        Validators.required,
        Validators.email,
        Validators.maxLength(32)
      ]),
      password: this.formBuilder.control(null, [
        Validators.maxLength(32),
        Validators.required
      ])
    }, {updateOn: 'change'});
    return this.form;
  }

  submitForm (): void {
    if (this.form) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        this.form?.disable();
        this.loginDataAccessService.makeRequest<LoginRequestParams, LoginResponseParams>({
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value
        }).subscribe((res) => console.log(res));
      }
    }
  }
}
