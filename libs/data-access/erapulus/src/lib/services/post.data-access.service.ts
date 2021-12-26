import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus.data-access.service';
import {ErapulusPost, ErapulusResponse} from '../erapulus.models';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface PostDeleteRequestParams {
  universityId: string,
  postId: string
}

export interface PostGetRequest {
  universityId: string,
  postId: string
}

export interface PostCreateRequestParams {
  title: string,
  content: string,
  university: string
}

export interface PostEditRequestParams extends PostCreateRequestParams {
  postId: string
}


@Injectable({
  providedIn: 'root'
})
export class PostDataAccessService extends ErapulusDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  createPost (request: PostCreateRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.post<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.university}/post`, request).pipe(take(1));
  }

  getPost (request: PostGetRequest): Observable<ErapulusResponse<ErapulusPost>> {
    return this.http.get<ErapulusResponse<ErapulusPost>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/post/${request.postId}`).pipe(take(1));
  }

  editPost (request: PostEditRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.put<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.university}/post/${request.postId}`, request).pipe(take(1));
  }

  deletePost (request: PostDeleteRequestParams): Observable<ErapulusResponse<unknown>> {
    return this.http.delete<ErapulusResponse<unknown>>(`${ErapulusDataAccessService.API_URL}/university/${request.universityId}/post/${request.postId}`).pipe(take(1));
  }


}
