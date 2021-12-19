import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '@erapulus/utils/local-storage';
import {StringUtils} from '@erapulus/utils/helpers';
import {DataAccessService} from './data-access.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor (private localStorageService: LocalStorageService) {
  }

  intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(DataAccessService.API_URL)) {
      const token = this.localStorageService.get('token');
      if (StringUtils.isNotEmpty(token)) {
        req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      }
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
      req = req.clone({headers: req.headers.set('Accept', 'application/json')});
    }

    return next.handle(req);
  }
}
