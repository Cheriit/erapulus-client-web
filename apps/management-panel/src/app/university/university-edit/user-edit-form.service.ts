import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {
  EmployeeEditRequestParams,
  ErapulusResponse,
  ErapulusUser,
  UserDataAccessService
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class UserEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private id?: string;

  constructor (private formBuilder: FormBuilder, private userDataAccessService: UserDataAccessService) {
    super();
  }

  public createForm (user: ErapulusUser): FormGroup {
    this.id = user.id;
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(user.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      lastName: this.formBuilder.control(user.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      email: this.formBuilder.control(user.email, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.email
      ]),
      phoneNumber: this.formBuilder.control(user.phoneNumber, [
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.phone()
      ])

    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.id) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: EmployeeEditRequestParams = {
          id: this.id,
          email: values['email'],
          firstName: values['firstName'],
          lastName: values['lastName'],
          phoneNumber: values['phoneNumber']
        };
        return this.userDataAccessService.editEmployee(requestData).pipe(
          take(1),
          tap(() => {
            this.form?.enable();
            this.form?.markAsTouched();
          }),
          catchError((error) => {
            this.form?.enable();
            this.form?.markAsTouched();
            return of(error as ErapulusResponse<unknown>);
          })
        );

      }
    }
    return null;
  }

}
