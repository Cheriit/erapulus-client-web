import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  ErapulusHelpers,
  ErapulusResponse,
  ErapulusUniversityDocument,
  UniversityDataAccessService,
  UniversityDocumentEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class UniversityDocumentEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private document?: ErapulusUniversityDocument;

  constructor (private formBuilder: FormBuilder, private universityDataAccessService: UniversityDataAccessService) {
    super();
  }

  public createForm (document: ErapulusUniversityDocument): FormGroup {
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
        const requestData: UniversityDocumentEditRequestParams = {
          id: this.document?.id,
          universityId: this.document.universityId,
          name: values['name'],
          description: values['description']
        };
        return ErapulusHelpers.handleRequest(this.universityDataAccessService.editUniversityDocument(requestData), this.form);
      }
    }
    return null;
  }

}
