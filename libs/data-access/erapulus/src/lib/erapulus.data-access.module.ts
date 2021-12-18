import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestInterceptor} from './request.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ResponseInterceptor} from './response.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ]
})
export class ErapulusDataAccessModule {
}
