import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {ErapulusResponse, PostCreateRequestParams, PostDataAccessService} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class PostCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;

  constructor (private formBuilder: FormBuilder, private postDataAccessService: PostDataAccessService) {
    super();
  }

  createForm (universityId: string): FormGroup {
    this.universityId = universityId;
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      content: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1)
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
        const requestData: PostCreateRequestParams = {
          title: values['title'],
          content: values['content'],
          university: this.universityId
        };
        return this.postDataAccessService.createPost(requestData).pipe(
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
