import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {ErapulusFaculty, ErapulusResponse} from '../erapulus.models';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface FacultyDeleteRequestParams {
  universityId: string,
  facultyId: string
}

export interface FacultyGetRequest {
  universityId: string,
  facultyId: string
}

export interface FacultyCreateRequestParams {
  name: string,
  address: string,
  email: string,
  universityId: string
}

export interface FacultyEditRequestParams extends FacultyCreateRequestParams {
  facultyId: string
}


@Injectable({
  providedIn: 'root'
})
export class FacultyDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createFaculty (request: FacultyCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty`, request).pipe(take(1));
  }

  getFaculty (request: FacultyGetRequest): Observable<ErapulusResponse<ErapulusFaculty>> {
    return this.http.get<ErapulusResponse<ErapulusFaculty>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}`).pipe(take(1));
  }

  editFaculty (request: FacultyEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}`, request).pipe(take(1));
  }

  deleteFaculty (request: FacultyDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}`).pipe(take(1));
  }


}
