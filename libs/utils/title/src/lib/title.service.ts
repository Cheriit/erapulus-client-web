import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor (private titleService: Title, private translateService: TranslateService) {
    this.title.subscribe((title) => {
      this.titleService.setTitle(`${this.translateService.instant(title || ' ')} | Erapulus`);
    });
  }

  public setTitle (title: string): void {
    this.title.next(title);
  }
}
