import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, take} from 'rxjs';
import {AuthFacade, AuthUser} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';
import {Router} from '@angular/router';
import {UniversityPermissionsService} from '../university-permissions.service';
import {NavigationRoutes} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-list',
  template: `
    <ng-container *ngIf="(user$ | async) as user">
      <ep-university-table></ep-university-table>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityListComponent implements OnInit {
  public user$: Observable<AuthUser | undefined> = this.authFacade.authUser$;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly titleService: TitleService,
    private readonly router: Router
  ) {
  }

  ngOnInit (): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user && !UniversityPermissionsService.canList(user)) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.UNIVERSITY,
          user?.universityId
        ]).then();
      }
    });
    this.titleService.setTitle('management-panel.title.university-list');
  }

}
