import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  remove (key: string): void {
    localStorage.removeItem(key);
  }

  get (name: string): string {
    const value = localStorage.getItem(name);
    return value ?? '';
  }

  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
