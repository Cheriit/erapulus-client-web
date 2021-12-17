import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-navbar',
  template: `
    <nav class="flex items-center justify-between h-16 bg-white border-gray-300 border-b-1 shadow-md p-5">
      <ep-text class="text-gray-500">{{title$ | async}}</ep-text>
    </nav> `,
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public title$ = this.titleService.title.asObservable();

  constructor (private titleService: TitleService) {
  }

}
