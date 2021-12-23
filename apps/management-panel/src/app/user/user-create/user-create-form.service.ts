import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {UserRole} from '@erapulus/utils/auth';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {EmployeeCreateRequestParams, ErapulusResponse, UserDataAccessService} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class UserCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private type?: UserRole;

  constructor (private formBuilder: FormBuilder, private userDataAccessService: UserDataAccessService) {
    super();
  }

  public createForm (type: UserRole): FormGroup {
    this.type = type;
    switch (type) {
    case UserRole.ADMINISTRATOR:
      this.form = this.getAdminForm();
      break;
    case UserRole.UNIVERSITY_ADMINISTRATOR:
    case UserRole.EMPLOYEE:
      this.form = this.getUniversityForm();
      break;
    default:
      this.form = this.formBuilder.group({});
    }
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.type) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.disable();
        this.form?.markAsPending();
        let request: Observable<ErapulusResponse<unknown>> | null;
        const values = this.form.value;
        const requestData: EmployeeCreateRequestParams = {
          email: values['email'],
          firstName: values['firstName'],
          lastName: values['lastName'],
          password: values['password'],
          phoneNumber: values['phoneNumber'],
          university: values['university']
        };
        switch (this.type) {
        case UserRole.ADMINISTRATOR:
          request = this.userDataAccessService.createAdministrator(requestData);
          break;
        case UserRole.UNIVERSITY_ADMINISTRATOR:
          request = this.userDataAccessService.createUniversityAdministrator(requestData);
          break;
        case UserRole.EMPLOYEE:
          request = this.userDataAccessService.createEmployee(requestData);
          break;
        default:
          request = null;
        }
        if (request !== null) {
          return request.pipe(
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
    }
    return null;
  }

  private getAdminForm (): FormGroup {
    return this.formBuilder.group({
      ...this.getCommonForm()
    });
  }

  private getUniversityForm (): FormGroup {
    return this.formBuilder.group({
      ...this.getCommonForm(),
      university: this.formBuilder.control(null, [Validators.required])
    });
  }

  private getCommonForm (): { [p: string]: AbstractControl } {
    return {
      firstName: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      lastName: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.password()
      ]),
      confirmPassword: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.passwordConfirm('password')
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.email
      ]),
      phoneNumber: this.formBuilder.control('', [
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.phone()
      ])

    };
  }

}
