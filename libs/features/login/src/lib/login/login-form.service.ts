import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErapulusResponse, LoginDataAccessService, LoginResponseParams} from '@erapulus/data-access/erapulus';
import {catchError, Observable, of, take, tap} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class LoginFormService extends FormService {
  protected override form?: FormGroup;

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

  submitForm (): Observable<ErapulusResponse<LoginResponseParams>> | null {
    if (this.form) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.disable();
        this.form?.markAsPending();
        return this.loginDataAccessService.loginRequest({
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value
        }).pipe(
          take(1),
          tap(() => {
            this.form?.enable();
            this.form?.markAsTouched();
          }),
          catchError((error) => {
            this.form?.enable();
            this.form?.markAsTouched();
            return of(error as ErapulusResponse<LoginResponseParams>);
          })
        );
      }
    }
    return null;
  }
}
