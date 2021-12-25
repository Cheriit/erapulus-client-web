import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {ErapulusResponse, FacultyCreateRequestParams, FacultyDataAccessService} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class FacultyCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;

  constructor (private formBuilder: FormBuilder, private facultyDataAccessService: FacultyDataAccessService) {
    super();
  }

  createForm (universityId: string): FormGroup {
    this.universityId = universityId;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      address: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.email
      ])
    });
    return this.form;
  }


  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.universityId) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: FacultyCreateRequestParams = {
          name: values['name'],
          address: values['address'],
          email: values['email'],
          universityId: this.universityId
        };
        return this.facultyDataAccessService.createFaculty(requestData).pipe(
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
    return of();
  }
}
