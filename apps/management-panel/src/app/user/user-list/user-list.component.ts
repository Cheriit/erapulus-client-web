import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'ep-users-list',
  template: ` <p>users-list works!</p> `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  constructor () {
  }

  ngOnInit (): void {
  }
}
 
