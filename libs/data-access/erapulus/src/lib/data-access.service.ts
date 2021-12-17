import {Observable} from 'rxjs';
import {ErapulusResponse} from './erapulus-response.model';

export abstract class DataAccessService {
  protected readonly API_URL = '/api/erapulus';

  public abstract makeRequest<Req, Res>(request: Req): Observable<ErapulusResponse<Res>>;
}
