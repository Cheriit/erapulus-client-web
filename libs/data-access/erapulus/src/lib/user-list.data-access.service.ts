import {Injectable} from '@angular/core';
import {DataAccessService} from './data-access.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErapulusResponse} from './erapulus-response.model';
import {TableDataAccessService, TableRequest} from '@erapulus/ui/table';
import {ErapulusUser} from '@erapulus/data-access/erapulus';

export type UserListRequestParams = TableRequest

export interface UserListResponseParams {
  users: ErapulusUser[]
}

@Injectable({
  providedIn: 'root'
})
export class UserListDataAccessService extends TableDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  makeRequest<Req extends TableRequest, Res> (request: Req): Observable<ErapulusResponse<Res>> {
    return this.http.post<ErapulusResponse<Res>>(`${DataAccessService.API_URL}/${request.url}`, request);
  }

}
