import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-user-edit',
  template: `
    <div>User edit</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent {

}
