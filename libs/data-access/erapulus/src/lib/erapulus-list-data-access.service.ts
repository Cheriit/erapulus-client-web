import {Injectable} from '@angular/core';
import {DataAccessService} from './data-access.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErapulusResponse} from './erapulus-response.model';
import {ErapulusUser} from './erapulus.models';
import {TableDataAccessService, TableRequest} from '@erapulus/ui/table';

export type UserListRequestParams = TableRequest

export interface UserListResponseParams {
  users: ErapulusUser[]
}

@Injectable({
  providedIn: 'root'
})
export class ErapulusListDataAccessService extends TableDataAccessService {

  constructor (protected http: HttpClient) {
    super();
  }

  makeRequest<Res> (request: TableRequest): Observable<ErapulusResponse<Res>> {
    return this.http.get<ErapulusResponse<Res>>(`${DataAccessService.API_URL}/${request.url}`, {
      withCredentials: true,
      params: {...request.parameters, page: request.page, pageSize: request.pageSize}
    });
  }

}
