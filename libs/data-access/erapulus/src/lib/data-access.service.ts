import {Observable} from 'rxjs';
import {ErapulusResponse} from './erapulus-response.model';

export abstract class DataAccessService {
  protected readonly API_URL = 'https://erapulus-server.azurewebsites.net/api';

  public abstract makeRequest<Req, Res>(request: Req): Observable<ErapulusResponse<Res>>;
}
