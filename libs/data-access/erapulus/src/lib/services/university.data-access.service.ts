import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from './erapulus-data-access.service';
import {SelectAccessor, SelectItem} from '@erapulus/ui/components';
import {ErapulusResponse} from '@erapulus/data-access/erapulus';
import {map, Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface University {
  id: string,
  name: string,
  logoUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class UniversityDataAccessService extends ErapulusDataAccessService implements SelectAccessor {

  constructor (protected http: HttpClient) {
    super();
  }

  get (): Observable<SelectItem[]> {
    return this.http.get<ErapulusResponse<University[]>>(`${ErapulusDataAccessService.API_URL}/university`, {
      withCredentials: true
    }).pipe(
      take(1),
      map((response) => response.payload.map((university): SelectItem => ({id: university.id, name: university.name})))
    );
  }

}
