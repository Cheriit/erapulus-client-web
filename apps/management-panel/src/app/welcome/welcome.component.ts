import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-app-main',
  template: `
    <ep-sidebar-layout>
      aaa
    </ep-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

  constructor (private titleService: TitleService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.title.welcome');
  }

}
