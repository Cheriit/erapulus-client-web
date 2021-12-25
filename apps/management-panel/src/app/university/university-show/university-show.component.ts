import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthFacade} from '@erapulus/utils/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {take, zip} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {HeaderType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusUniversity, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {UniversityPermissionsService} from '../university-permissions.service';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!university">
      <div class="content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.university.title' | translate}}</ep-header>
        <ep-university-show-details [university]="university" *ngIf="university"></ep-university-show-details>
      </div>
    </ep-container>
  `,
  styleUrls: ['./university-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityShowComponent implements OnInit {
  public readonly headerType = HeaderType;
  public university?: ErapulusUniversity;
  private readonly authUser$ = this.authFacade.authUser$;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly universityDataAccessService: UniversityDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.edit');
    const id: string = this.route.snapshot.paramMap.get('id') ?? '-1';
    zip(this.universityDataAccessService.getUniversity({id: id}), this.authUser$).pipe(take(1)).subscribe(([
      {payload},
      user
    ]) => {
      if (!payload || !user || !UniversityPermissionsService.canAccess(user, id)) {
        this.router.navigate([
          NavigationRoutes.ROOT,
          NavigationRoutes.WELCOME
        ]).then();
      } else {
        this.university = payload;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

}
