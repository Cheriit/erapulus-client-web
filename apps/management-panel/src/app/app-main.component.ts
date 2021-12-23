import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-user',
  template: `
    <ep-sidebar-layout>
      <div class="px-10">
        <router-outlet></router-outlet>
      </div>
    </ep-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMainComponent {
}
