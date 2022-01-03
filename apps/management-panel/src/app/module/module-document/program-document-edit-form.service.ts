import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusProgramDocument,
  ErapulusResponse,
  ProgramDataAccessService,
  ProgramDocumentEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class ProgramDocumentEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private document?: ErapulusProgramDocument;

  constructor (private formBuilder: FormBuilder, private programDataAccessService: ProgramDataAccessService) {
    super();
  }

  public createForm (document: ErapulusProgramDocument): FormGroup {
    this.document = document;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(document.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      description: this.formBuilder.control(document.description ?? '', [Validators.minLength(3)])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.document) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: ProgramDocumentEditRequestParams = {
          id: this.document.id,
          programId: this.document.programId,
          facultyId: this.document.facultyId,
          universityId: this.document.universityId,
          name: values['name'],
          description: values['description']
        };
        return ErapulusHelpers.handleRequest(this.programDataAccessService.editProgramDocument(requestData), this.form);
      }
    }
    return null;
  }

}
