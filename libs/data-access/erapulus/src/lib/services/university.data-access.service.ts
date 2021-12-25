import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus-data-access.service';
import {SelectAccessor, SelectItem} from '@erapulus/ui/components';
import {ErapulusResponse, ErapulusUniversity} from '../erapulus.models';
import {map, Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface UniversityDeleteRequestParams {
  id: string
}

export interface UniversityGetRequest {
  id: string
}

export interface UniversityGetListResponse {
  id: string,
  name: string,
  logoUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class UniversityDataAccessService extends ErapulusDataAccessService implements SelectAccessor {

  constructor (protected http: HttpClient) {
    super();
  }


  get (): Observable<SelectItem[]> {
    return this.http.get<ErapulusResponse<UniversityGetListResponse[]>>(`${ErapulusDataAccessService.API_URL}/university`, {
      withCredentials: true
    }).pipe(
      take(1),
      map((response) => response.payload.map((university): SelectItem => ({id: university.id, name: university.name})))
    );
  }

  getUniversity (request: UniversityGetRequest): Observable<ErapulusResponse<ErapulusUniversity>> {
    return this.http.get<ErapulusResponse<ErapulusUniversity>>(`${ErapulusDataAccessService.API_URL}/university/${request.id}`);
  }

  deleteUniversity (request: UniversityDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.id}`);
  }


}
