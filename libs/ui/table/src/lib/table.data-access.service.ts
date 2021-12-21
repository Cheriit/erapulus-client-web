import {Observable} from 'rxjs';
import {ErapulusResponse} from '@erapulus/data-access/erapulus';
import {TableRequest} from './table.models';

export abstract class TableDataAccessService {
  public abstract makeRequest<Req extends TableRequest, Res>(request: Req): Observable<ErapulusResponse<Res[]>>;
}
