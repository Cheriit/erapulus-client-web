import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-app',
  template: `
    <ng-template epMessage></ng-template>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
