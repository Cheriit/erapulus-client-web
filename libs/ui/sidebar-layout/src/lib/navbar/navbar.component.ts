import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';
import {Store} from '@ngrx/store';
import {AuthActions} from '@erapulus/utils/auth';

@Component({
  selector: 'ep-navbar',
  template: `
    <nav class="flex items-center justify-between h-16 bg-white border-gray-300 border-b-1 shadow-md p-5">
      <ep-text class="text-gray-500">{{title$ | async}}</ep-text>
      <img src="/assets/icons/exit.svg" alt="Sign Out"
           class="cursor-pointer text-red-500 hover:scale-125 transition-transform"
           (click)="signOut()"/>
    </nav> `,
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public title$ = this.titleService.title.asObservable();

  constructor (private titleService: TitleService, private store: Store) {
  }

  public signOut (): void {
    this.store.dispatch(AuthActions.signOut());
  }

}
