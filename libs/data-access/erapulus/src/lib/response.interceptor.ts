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
export class ResponseInterceptor implements HttpInterceptor {

  constructor (private messageService: MessageService, private router: Router) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith('https://erapulus-server.azurewebsites.net/api')) {
      return next.handle(req).pipe(
        map((event) => {
          if (isDevMode()) {
            // eslint-disable-next-line no-console
            console.log(event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.router.navigate([
              '/',
              'login'
            ]).then(() => {
              this.messageService.generateMessage({
                title: 'common.erapulus.server.unauthorized.title',
                content: 'common.erapulus.server.unauthorized.content'
              });
            });
          } else {
            if (error.status !== 500 && error.status !== 0) {
              this.messageService.generateMessage({
                title: `common.erapulus.server.error.${error.error?.status}.title`,
                content: ErapulusHelpers.getErrors<unknown>(error.error?.message)
              });
            } else {
              this.messageService.generateMessage({
                title: 'common.erapulus.server.500.title',
                content: 'common.erapulus.server.500.content'
              });
            }
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(req);

  }
}
