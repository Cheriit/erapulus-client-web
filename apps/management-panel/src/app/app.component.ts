import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-app',
  template: `
    <ep-sidebar-layout>
      <router-outlet></router-outlet>
    </ep-sidebar-layout>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor (private titleService: TitleService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.title.dashboard');
  }

}
