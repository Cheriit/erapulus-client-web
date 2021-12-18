import {Injectable} from '@angular/core';
import {DataAccessService} from './data-access.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErapulusResponse} from './erapulus-response.model';

export interface LoginRequestParams {
  email: string,
  password: string
}

export interface LoginResponseParams {
  userId: number,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginDataAccessService extends DataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  makeRequest<Req, Res> (request: Req): Observable<ErapulusResponse<Res>> {
    fetch('https://erapulus-server.azurewebsites.net/api/user/login/employee', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'erapulus@gmail.com',
        password: 'LubiePlacki'
      })
    }).then((x) => console.log(x))
      .catch((x) => console.log(x));
    // return of();
    // this.http.post('', {
    //   email: 'erapulus@gmail.com',
    //   password: 'LubiePlacki'
    // }).subscribe((x) => console.log(x));
    return this.http.post<ErapulusResponse<Res>>(`${this.API_URL}/user/login/employee`, request);
  }

}