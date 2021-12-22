import {Observable} from 'rxjs';
import {TableRequest, TableResponse} from './table.models';

export abstract class TableDataAccessService {
  public abstract makeRequest<Res>(request: TableRequest): Observable<TableResponse<Res>>;
}
