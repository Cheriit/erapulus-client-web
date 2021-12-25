import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {
  ErapulusResponse,
  UniversityCreateRequestParams,
  UniversityDataAccessService
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class FacultyCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;

  constructor (private formBuilder: FormBuilder, private universityDataAccessService: UniversityDataAccessService) {
    super();
  }

  createForm (): FormGroup {
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
      address2: this.formBuilder.control('', [
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      zipcode: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      city: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      country: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      description: this.formBuilder.control('', [
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      websiteUrl: this.formBuilder.control('', [
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.url()
      ])
    });
    return this.form;
  }


  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: UniversityCreateRequestParams = {
          name: values['name'],
          address: values['address'],
          address2: values['address2'],
          zipcode: values['zipcode'],
          city: values['city'],
          country: values['country'],
          description: values['description'],
          websiteUrl: values['websiteUrl']
        };
        return this.universityDataAccessService.createUniversity(requestData).pipe(
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
