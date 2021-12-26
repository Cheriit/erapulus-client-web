import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusResponse,
  ErapulusUniversity,
  UniversityDataAccessService,
  UniversityEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class UniversityEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private id?: string;

  constructor (private formBuilder: FormBuilder, private universityDataAccessService: UniversityDataAccessService) {
    super();
  }

  public createForm (university: ErapulusUniversity): FormGroup {
    this.id = university.id;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(university.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      address: this.formBuilder.control(university.address, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      address2: this.formBuilder.control(university.address2 ?? '', [
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      zipcode: this.formBuilder.control(university.zipcode, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      city: this.formBuilder.control(university.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      country: this.formBuilder.control(university.country, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      description: this.formBuilder.control(university.description ?? '', [Validators.minLength(3)]),
      websiteUrl: this.formBuilder.control(university.websiteUrl ?? '', [
        Validators.minLength(3),
        Validators.maxLength(64),
        CustomValidators.url()
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
        const requestData: UniversityEditRequestParams = {
          id: this.id,
          name: values['name'],
          address: values['address'],
          address2: values['address2'],
          zipcode: values['zipcode'],
          city: values['city'],
          country: values['country'],
          description: values['description'],
          websiteUrl: values['websiteUrl']
        };
        return ErapulusHelpers.handleRequest(this.universityDataAccessService.editUniversity(requestData), this.form);
      }
    }
    return null;
  }

}
