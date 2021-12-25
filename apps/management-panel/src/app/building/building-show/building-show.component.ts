import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {BuildingDataAccessService, ErapulusBuilding} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!building">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.building.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="building">
          <div class="w-full px-4">
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.building.show.name' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{building.name}} ({{building.abbrev}})</ep-text>
            </div>
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.building.show.position' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{building.latitude}}, {{building.longitude}}</ep-text>
            </div>
          </div>
          <div class="footer-buttons">
            <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
              {{'management-panel.create.building.cancel' | translate}}
              <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
            <ep-button (click)="edit()">
              {{'management-panel.create.building.edit' | translate}}
              <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
          </div>
        </div>
      </div>
    </ep-container>
  `,
  styleUrls: ['./building-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingShowComponent implements OnInit {
  public building?: ErapulusBuilding;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;


  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly buildingDataAccessService: BuildingDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.building.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const buildingId: string = this.route.snapshot.paramMap.get('building_id') ?? '-1';
    this.buildingDataAccessService.getBuilding({buildingId, universityId}).pipe(take(1)).subscribe(({payload}) => {
      this.building = payload;
      this.changeDetectorRef.markForCheck();
    });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.building?.university,
      NavigationRoutes.BUILDING,
      this.building?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
