import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-sidebar',
  template: `
    <aside class="h-screen w-16 bg-red-400 shadow-lg overflow-hidden flex justify-between">
      <div class="overflow-y-auto flex-grow">
        <ep-logo></ep-logo>
        <ep-sidebar-item></ep-sidebar-item>
        <ep-sidebar-item></ep-sidebar-item>
        <ep-sidebar-item></ep-sidebar-item>
      </div>
      <div [class.rotate-180]="opened" class="w-100">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7.2928 13.7071L8.70701 12.2929L3.41412 7.00001L8.70701 1.70712L7.2928 0.292908L0.585693 7.00001L7.2928 13.7071ZM13.707 12.2929L8.41412 7.00001L13.707 1.70712L12.2928 0.292908L5.58569 7.00001L12.2928 13.7071L13.707 12.2929Z"
                fill="black"/>
        </svg>
      </div>
    </aside> `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  public opened = true;

}
