import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-app',
  template: `
    <div class="text-5xl">tmp</div> `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'management-panel';
}
