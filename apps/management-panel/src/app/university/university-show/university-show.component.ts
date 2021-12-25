import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusUniversity, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!university">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.university.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="university">
          <div class="w-full md:w-1/2 px-4">
            <div class="pb-3" *ngIf="university.logoUrl">
              <img [src]="university.logoUrl" [alt]="university.name + ' logo'" class="w-full"/>
            </div>
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.name' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.name}}</ep-text>
            </div>
            <div class="pb-3" *ngIf="university.websiteUrl">
              <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.url' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.websiteUrl}}</ep-text>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 ">
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.address' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.address}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.address2}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.zipcode}} {{university.city}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.country}}</ep-text>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4" *ngIf="university.description">
            <ep-text
              [textType]="textType.LARGE">{{'management-panel.university.show.description' | translate}}</ep-text>
            <ep-text [textType]="textType.SMALL">{{university.description}}</ep-text>
          </div>
        </div>
        <div class="footer-buttons">
          <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
            {{'management-panel.create.university.cancel' | translate}}
            <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
          <ep-button (click)="edit()">
            {{'management-panel.create.university.edit' | translate}}
            <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
        </div>
      </div>
    </ep-container>
  `,
  styleUrls: ['./university-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityShowComponent implements OnInit {
  public university?: ErapulusUniversity;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;


  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly universityDataAccessService: UniversityDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.user.edit');
    const id: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.universityDataAccessService.getUniversity({id: id}).pipe(take(1)).subscribe(({payload}) => {
      this.university = payload;
      this.changeDetectorRef.markForCheck();
    });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.university?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
