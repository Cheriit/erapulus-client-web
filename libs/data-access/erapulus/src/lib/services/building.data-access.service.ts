import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {ErapulusBuilding, ErapulusResponse} from '../erapulus.models';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface BuildingDeleteRequestParams {
  universityId: string,
  buildingId: string
}

export interface BuildingGetRequest {
  universityId: string,
  buildingId: string
}

export interface BuildingCreateRequestParams {
  name: string,
  abbrev: string,
  latitude: number,
  longitude: number,
  universityId: string
}

export interface BuildingEditRequestParams extends BuildingCreateRequestParams {
  buildingId: string
}


@Injectable({
  providedIn: 'root'
})
export class BuildingDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createBuilding (request: BuildingCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/building`, request).pipe(take(1));
  }

  getBuilding (request: BuildingGetRequest): Observable<ErapulusResponse<ErapulusBuilding>> {
    return this.http.get<ErapulusResponse<ErapulusBuilding>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/building/${request.buildingId}`).pipe(take(1));
  }

  editBuilding (request: BuildingEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/building/${request.buildingId}`, request).pipe(take(1));
  }

  deleteBuilding (request: BuildingDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/building/${request.buildingId}`).pipe(take(1));
  }


}
