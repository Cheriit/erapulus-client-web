import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {ErapulusResponse, ErapulusUser} from '../erapulus.models';

export interface UserDeleteRequestParams {
  id: string
}

export interface EmployeeGetRequestParams {
  id: string
}

export interface EmployeeCreateRequestParams {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  university?: number,
  phoneNumber?: string
}

export interface EmployeeEditRequestParams {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createAdministrator (request: EmployeeCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/user/register/administrator`, request).pipe(take(1));
  }

  createUniversityAdministrator (request: EmployeeCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/user/register/university-administrator`, request).pipe(take(1));
  }

  createEmployee (request: EmployeeCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/user/register/employee`, request).pipe(take(1));
  }

  getEmployee (request: EmployeeGetRequestParams): Observable<ErapulusResponse<ErapulusUser>> {
    return this.http.get<ErapulusResponse<ErapulusUser>>(`${ErapulusDataAccessService.API_URL}/employee/${request.id}`).pipe(take(1));
  }

  editEmployee (request: EmployeeEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/employee/${request.id}`, request).pipe(take(1));
  }

  deleteUser (request: UserDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/user/${request.id}`).pipe(take(1));
  }

}
