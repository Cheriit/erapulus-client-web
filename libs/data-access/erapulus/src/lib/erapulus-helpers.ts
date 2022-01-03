import {ObjectUtils} from '@erapulus/utils/helpers';
import {catchError, Observable, of, tap} from 'rxjs';
import {ErapulusResponse} from './erapulus.models';
import {FormGroup} from '@angular/forms';

export class ErapulusHelpers {
  public static getErrors (response: string): string[] {
    if (ObjectUtils.isNotEmpty(response)) {
      const errors = response.split(';').map((error) => `erapulus.server.${error}.error`);
      if (errors.length > 1) {
        errors.shift();
      }
      return errors;
    } else {
      return ['common.erapulus.server.unknown.error'];
    }
  }

  public static handleRequest<T> (request: Observable<ErapulusResponse<T>>, form?: FormGroup): Observable<ErapulusResponse<T | unknown>> {
    return request.pipe(
      tap(() => {
        form?.enable();
        form?.markAsTouched();
      }),
      catchError((error) => {
        form?.enable();
        form?.markAsTouched();
        return of(error as ErapulusResponse<unknown>);
      })
    );
  }
}
