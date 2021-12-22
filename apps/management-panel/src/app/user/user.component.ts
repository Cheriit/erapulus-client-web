import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';
import {AppSidebarService} from '../app-sidebar.service';

@Component({
  selector: 'ep-user',
  template: `
    <ep-sidebar-layout>
      <div class="px-10">
        <router-outlet></router-outlet>
      </div>
    </ep-sidebar-layout>
  `,
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  constructor (private titleService: TitleService, private readonly appSidebarService: AppSidebarService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.title.user-list');
    this.appSidebarService.calculatePermissions();
  }

}
