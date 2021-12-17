import {Injectable, isDevMode} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {MessageService} from '@erapulus/ui/components';
import {ErapulusHelpers} from './erapulus-helpers';
import {Router} from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor (private messageService: MessageService, private router: Router) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      map((event) => {
        if (isDevMode()) {
          // eslint-disable-next-line no-console
          console.table(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.router.navigate([
            '/',
            'login'
          ]).then(() => {
            this.messageService.renderMessage({
              title: 'common.erapulus.server.unauthorized',
              content: 'common.erapulus.server.unauthorized.title'
            });
          });
        } else {
          this.messageService.renderMessage({
            title: `common.erapulus.server.error.${error.error.status}`,
            content: ErapulusHelpers.getErrors<unknown>(error.error.message)
          });
        }
        return throwError(() => error);
      })
    );
  }
}
