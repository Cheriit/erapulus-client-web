import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {ErapulusProgram, ErapulusResponse} from '../erapulus.models';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface ProgramDeleteRequestParams {
  universityId: string,
  facultyId: string,
  id: string
}

export interface ProgramDocumentRequestParams {
  universityId: string,
  facultyId: string,
  id: string,
  documentId: string
}

export interface ProgramGetRequest {
  universityId: string,
  facultyId: string,
  id: string,
}

export interface ProgramCreateRequestParams {
  universityId: string,
  facultyId: string,
  name: string,
  abbrev: string,
  description?: string
}

export interface ProgramEditRequestParams extends ProgramCreateRequestParams {
  id: string,
}

export interface ProgramDocumentEditRequestParams {
  id: string,
  universityId: string,
  facultyId: string,
  programId: string,
  name: string,
  description: string
}


@Injectable({
  providedIn: 'root'
})
export class ProgramDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createProgram (request: ProgramCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program`, request).pipe(take(1));
  }

  getProgram (request: ProgramGetRequest): Observable<ErapulusResponse<ErapulusProgram>> {
    return this.http.get<ErapulusResponse<ErapulusProgram>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.id}`).pipe(take(1));
  }

  editProgram (request: ProgramEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.id}`, request).pipe(take(1));
  }

  deleteProgram (request: ProgramDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.id}`).pipe(take(1));
  }

  getDocument (request: ProgramDocumentRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.get<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.id}/document/${request.documentId}`).pipe(take(1));
  }

  editProgramDocument (request: ProgramDocumentEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.programId}/document/${request.id}`, request).pipe(take(1));
  }

  deleteDocument (request: ProgramDocumentRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/faculty/${request.facultyId}/program/${request.id}/document/${request.documentId}`).pipe(take(1));
  }


}
