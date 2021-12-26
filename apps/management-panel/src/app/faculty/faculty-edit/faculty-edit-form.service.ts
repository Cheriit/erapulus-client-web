import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusFaculty,
  ErapulusHelpers,
  ErapulusResponse,
  FacultyDataAccessService,
  FacultyEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class FacultyEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private faculty?: ErapulusFaculty;

  constructor (private formBuilder: FormBuilder, private facultyDataAccessService: FacultyDataAccessService) {
    super();
  }

  public createForm (faculty: ErapulusFaculty): FormGroup {
    this.faculty = faculty;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(faculty.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      address: this.formBuilder.control(faculty.address, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ]),
      email: this.formBuilder.control(faculty.email, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.email
      ])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.faculty) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: FacultyEditRequestParams = {
          facultyId: this.faculty.id,
          universityId: this.faculty.universityId,
          name: values['name'],
          address: values['address'],
          email: values['email']
        };
        return ErapulusHelpers.handleRequest(this.facultyDataAccessService.editFaculty(requestData), this.form);
      }
    }
    return null;
  }

}
