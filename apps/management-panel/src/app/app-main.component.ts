import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';
import {AppSidebarService} from './app-sidebar.service';

@Component({
  selector: 'ep-app-main',
  template: `
    <ep-sidebar-layout>
      <router-outlet></router-outlet>
    </ep-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMainComponent implements OnInit {

  constructor (private titleService: TitleService, private readonly appSidebarService: AppSidebarService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.title.dashboard');
    this.appSidebarService.calculatePermissions();
  }

}
