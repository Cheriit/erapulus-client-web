import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {mergeMap, Observable, take} from 'rxjs';
import {LocalStorageService} from '@erapulus/utils/local-storage';
import {StringUtils} from '@erapulus/utils/helpers';
import {AuthFacade} from '@erapulus/utils/auth';
import {ErapulusDataAccessService} from './services/erapulus.data-access.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private token$ = this.authFacade.token$;

  constructor (private localStorageService: LocalStorageService, private authFacade: AuthFacade) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(ErapulusDataAccessService.API_URL)) {
      return this.token$.pipe(
        take(1),
        mergeMap((token) => {
          if (StringUtils.isNotEmpty(token)) {
            req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
          }
          req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
          req = req.clone({headers: req.headers.set('Accept', 'application/json')});
          return next.handle(req);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
