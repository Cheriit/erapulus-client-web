import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  get (name: string): string {
    const value = localStorage.getItem(name);
    return value ?? '';
  }
}
