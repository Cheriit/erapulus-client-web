import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusProgram,
  ErapulusResponse,
  ProgramDataAccessService,
  ProgramEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class ProgramEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;
  private program?: ErapulusProgram;

  constructor (private formBuilder: FormBuilder, private programDataAccessService: ProgramDataAccessService) {
    super();
  }

  public createForm (program: ErapulusProgram, universityId: string): FormGroup {
    this.universityId = universityId;
    this.program = program;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(program.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      abbrev: this.formBuilder.control(program.abbrev, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(16)
      ]),
      description: this.formBuilder.control(program.description, [Validators.minLength(3)])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.universityId && this.program) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: ProgramEditRequestParams = {
          id: this.program.id,
          universityId: this.universityId,
          facultyId: this.program.facultyId,
          name: values['name'],
          abbrev: values['abbrev'],
          description: values['description']
        };
        return ErapulusHelpers.handleRequest(this.programDataAccessService.editProgram(requestData), this.form);
      }
    }
    return null;
  }

}
