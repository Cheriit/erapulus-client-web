import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable, of} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusResponse,
  ModuleCreateRequestParams,
  ModuleDataAccessService
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class ModuleCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;
  private facultyId?: string;
  private programId?: string;

  constructor (private formBuilder: FormBuilder, private moduleDataAccessService: ModuleDataAccessService) {
    super();
  }

  createForm (universityId: string, facultyId: string, programId: string): FormGroup {
    this.universityId = universityId;
    this.facultyId = facultyId;
    this.programId = programId;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      abbrev: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(16)
      ]),
      description: this.formBuilder.control('', [Validators.minLength(3)])
    });
    return this.form;
  }


  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.universityId && this.facultyId && this.programId) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: ModuleCreateRequestParams = {
          universityId: this.universityId,
          facultyId: this.facultyId,
          programId: this.programId,
          name: values['name'],
          abbrev: values['abbrev'],
          description: values['description']
        };
        return ErapulusHelpers.handleRequest(this.moduleDataAccessService.createModule(requestData), this.form);
      }
    }
    return of();
  }
}
