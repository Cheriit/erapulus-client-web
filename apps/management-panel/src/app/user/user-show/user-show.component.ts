import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-user-show',
  template: `
    <div>User show</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserShowComponent {

}
