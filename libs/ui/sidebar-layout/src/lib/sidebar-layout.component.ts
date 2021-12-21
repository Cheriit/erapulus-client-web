import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {SidebarService} from './sidebar.service';

@Component({
  selector: 'ep-sidebar-layout',
  template: `
    <div class="w-screen h-screen flex overflow-hidden relative">
      <ep-sidebar></ep-sidebar>
      <div class="content">
        <ep-navbar></ep-navbar>
        <main class="overflow-y-auto w-full h-full">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLayoutComponent implements OnInit {
  constructor (@Inject('SIDEBAR_SERVICE') private sidebarService: SidebarService) {
  }

  ngOnInit (): void {
    this.sidebarService.calculatePermissions();
  }
}
