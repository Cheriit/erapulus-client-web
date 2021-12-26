import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {ErapulusResponse} from '../erapulus.models';

export interface LoginRequestParams {
  email: string,
  password: string
}

export interface LoginResponseParams {
  userId: string,
  token: string,
  universityId: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  loginRequest (request: LoginRequestParams): Observable<ErapulusResponse<LoginResponseParams>> {
    return this.http.post<ErapulusResponse<LoginResponseParams>>(`${ErapulusDataAccessService.API_URL}/user/login/employee`, request).pipe(take(1));
  }

}
