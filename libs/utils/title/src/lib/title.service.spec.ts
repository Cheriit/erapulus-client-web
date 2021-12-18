import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor (private titleService: Title) {
    this.title.subscribe((title) => {
      this.titleService.setTitle(`${title} | Erapulus`);
    });
  }

  public setTitle (title: string): void {
    this.title.next(title);
  }
}