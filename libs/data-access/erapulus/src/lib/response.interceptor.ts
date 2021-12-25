import {Injectable, isDevMode} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import {catchError, map, Observable, throwError, timeout} from 'rxjs';
import {ErapulusHelpers} from './erapulus-helpers';
import {Router} from '@angular/router';
import {ErapulusDataAccessService} from './services/erapulus-data-access.service';
import {MessageService} from '@erapulus/ui/message';
import {ObjectUtils} from '@erapulus/utils/helpers';
import {ErapulusResponse} from './erapulus.models';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor (private messageService: MessageService, private router: Router) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(ErapulusDataAccessService.API_URL)) {
      return next.handle(req).pipe(
        timeout(10000),
        map((event: HttpEvent<ErapulusResponse<unknown>>) => {
          if (isDevMode() && event.type !== 0) {
            // eslint-disable-next-line no-console
            console.log(event);
          }
          if (event instanceof HttpResponse && event.body && ObjectUtils.isEmpty(event.body.payload)) {
            throw new HttpErrorResponse({
              headers: event.headers,
              status: 500,
              statusText: 'Warning',
              url: event.url ?? ''
            });
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
          case 0:
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
    return next.handle(req).pipe(timeout(10000));

  }
}
