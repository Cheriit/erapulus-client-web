import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusModule,
  ErapulusResponse,
  ModuleDataAccessService,
  ModuleEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class ModuleEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;
  private facultyId?: string;
  private module?: ErapulusModule;

  constructor (private formBuilder: FormBuilder, private moduleDataAccessService: ModuleDataAccessService) {
    super();
  }

  public createForm (module: ErapulusModule, universityId: string, facultyId: string): FormGroup {
    this.universityId = universityId;
    this.facultyId = facultyId;
    this.module = module;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(module.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      abbrev: this.formBuilder.control(module.abbrev, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(16)
      ]),
      description: this.formBuilder.control(module.description, [Validators.minLength(3)])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.universityId && this.module) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: ModuleEditRequestParams = {
          id: this.module.id,
          universityId: this.universityId,
          facultyId: this.facultyId ?? '-1',
          programId: this.module.programId,
          name: values['name'],
          abbrev: values['abbrev'],
          description: values['description']
        };
        return ErapulusHelpers.handleRequest(this.moduleDataAccessService.editModule(requestData), this.form);
      }
    }
    return null;
  }

}
