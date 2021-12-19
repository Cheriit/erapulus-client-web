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
import {DataAccessService} from './data-access.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor (private messageService: MessageService, private router: Router) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(DataAccessService.API_URL)) {
      return next.handle(req).pipe(
        map((event) => {
          if (isDevMode() && event.type !== 0) {
            // eslint-disable-next-line no-console
            console.log(event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.router.navigate([
              '/',
              'login'
            ]).then(() => {
              this.messageService.generateMessage({
                title: 'common.erapulus.server.401.title',
                content: 'common.erapulus.server.401.content'
              });
            });
            break;
          case HttpStatusCode.InternalServerError:
            this.messageService.generateMessage({
              title: 'common.erapulus.server.500.title',
              content: 'common.erapulus.server.500.content'
            });
            break;
          default:
            this.messageService.generateMessage({
              title: `common.erapulus.server.error.${error.error?.status}.title`,
              content: ErapulusHelpers.getErrors(error.error?.message)
            });
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(req);

  }
}
