import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {ErapulusModule, ErapulusResponse} from '../erapulus.models';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface ModuleDeleteRequestParams {
  universityId: string,
  facultyId: string,
  programId: string,
  id: string
}

export interface ModuleDocumentRequestParams {
  universityId: string,
  facultyId: string,
  programId: string,
  id: string,
  documentId: string
}

export interface ModuleGetRequest {
  universityId: string,
  facultyId: string,
  programId: string,
  id: string,
}

export interface ModuleCreateRequestParams {
  universityId: string,
  facultyId: string,
  programId: string,
  name: string,
  abbrev: string,
  description?: string
}

export interface ModuleEditRequestParams extends ModuleCreateRequestParams {
  id: string,
}

export interface ModuleDocumentEditRequestParams {
  id: string,
  universityId: string,
  facultyId: string,
  programId: string,
  moduleId: string,
  name: string,
  description: string
}


@Injectable({
  providedIn: 'root'
})
export class ModuleDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createModule (request: ModuleCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module`, request).pipe(take(1));
  }

  getModule (request: ModuleGetRequest): Observable<ErapulusResponse<ErapulusModule>> {
    return this.http.get<ErapulusResponse<ErapulusModule>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.id}`).pipe(take(1));
  }

  editModule (request: ModuleEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.id}`, request).pipe(take(1));
  }

  deleteModule (request: ModuleDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.id}`).pipe(take(1));
  }

  getDocument (request: ModuleDocumentRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.get<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.id}/document/${request.documentId}`).pipe(take(1));
  }

  editModuleDocument (request: ModuleDocumentEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.moduleId}/document/${request.id}`, request).pipe(take(1));
  }

  deleteDocument (request: ModuleDocumentRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/module/${request.id}/document/${request.documentId}`).pipe(take(1));
  }


}
