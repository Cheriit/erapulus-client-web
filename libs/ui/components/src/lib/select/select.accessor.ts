import {Observable} from 'rxjs';

export interface SelectItem {
  id: string,
  name: string
}

export interface SelectAccessor {
  get(): Observable<SelectItem[]>
}
