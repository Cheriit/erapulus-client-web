import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {
  ErapulusPost,
  ErapulusResponse,
  PostDataAccessService,
  PostEditRequestParams
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class PostEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private post?: ErapulusPost;

  constructor (private formBuilder: FormBuilder, private postDataAccessService: PostDataAccessService) {
    super();
  }

  public createForm (post: ErapulusPost): FormGroup {
    this.post = post;
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(post.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      content: this.formBuilder.control(post.content, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.post) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: PostEditRequestParams = {
          postId: this.post.id,
          university: this.post.university,
          title: values['title'],
          content: values['content']
        };
        return this.postDataAccessService.editPost(requestData).pipe(
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
    return null;
  }

}
