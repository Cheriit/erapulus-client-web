import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  public userId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userDeleted$: Subject<boolean> = new Subject<boolean>();
}
