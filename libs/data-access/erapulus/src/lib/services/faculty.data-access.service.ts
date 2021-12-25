import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus-data-access.service';
import {ErapulusFaculty, ErapulusResponse} from '../erapulus.models';
import {Observable} from 'rxjs';
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
  university: string
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
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.university}/faculty`, request);
  }

  getFaculty (request: FacultyGetRequest): Observable<ErapulusResponse<ErapulusFaculty>> {
    return this.http.get<ErapulusResponse<ErapulusFaculty>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}`);
  }

  editFaculty (request: FacultyEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.university}/faculty/${request.facultyId}`, request);
  }

  deleteFaculty (request: FacultyDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}`);
  }


}
