import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-app-main',
  template: `
    <div class="w-full h-full flex items-center justify-center flex-col p-10">
      <ep-header class="block w-full truncate">
        {{'management.panel.welcome.title' | translate}}
      </ep-header>
      <br>
      <ep-text class="block w-full truncate">
        {{'management.panel.welcome.content' | translate}}
      </ep-text>
    </div>
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
