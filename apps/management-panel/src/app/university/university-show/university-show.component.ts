import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusHelpers, ErapulusUniversity, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!university">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.university.show.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="university">
          <div class="w-full md:w-1/2 px-4">
            <div class="pb-3" *ngIf="university.logoUrl">
              <img [src]="university.logoUrl" [alt]="university.name + ' logo'"
                   class="image"/>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 ">
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.name' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.name}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.websiteUrl}}</ep-text>
            </div>
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.address' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.address}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.address2}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.zipcode}} {{university.city}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{university.country}}</ep-text>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 pb-5" *ngIf="university.description">
            <ep-text
              [textType]="textType.LARGE">{{'management-panel.university.show.description' | translate}}</ep-text>
            <markdown [data]="university.description"></markdown>
          </div>
        </div>
        <div class="footer-buttons">
          <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
            {{'management-panel.university.action.cancel' | translate}}
            <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
          <ep-button (click)="edit()">
            {{'management-panel.university.action.edit' | translate}}
            <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
        </div>
      </div>
    </ep-container>
    <ep-university-files></ep-university-files>
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
    this.titleService.setTitle('management-panel.university.show');
    const id: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.universityDataAccessService.getUniversity({id: id}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.university = response.payload as ErapulusUniversity;
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
