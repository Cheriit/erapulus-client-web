import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-sidebar-layout',
  template: `
    <div class="w-screen h-screen flex overflow-hidden">
      <ep-sidebar></ep-sidebar>
      <div class="flex-grow">
        <ep-navbar></ep-navbar>
        <main class="overflow-y-auto">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLayoutComponent {
}
