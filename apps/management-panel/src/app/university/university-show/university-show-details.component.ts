import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {ErapulusUniversity} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-university-show-details',
  template: `
    <div class="flex flex-wrap mt-10">
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
        <ep-text [textType]="textType.LARGE">{{'management-panel.university.show.description' | translate}}</ep-text>
        <ep-text [textType]="textType.SMALL">{{university.description}}</ep-text>
      </div>
    </div>
    <div class="buttons">
      <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
        {{'management-panel.create.university.cancel' | translate}}
        <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
      </ep-button>
      <ep-button (click)="edit()">
        {{'management-panel.create.university.edit' | translate}}
        <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
      </ep-button>
    </div>
  `,
  styleUrls: ['./university-show-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityShowDetailsComponent {
  @Input() university!: ErapulusUniversity;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;

  constructor (
    private readonly navigationService: NavigationService,
    private readonly router: Router
  ) {
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.university.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }
}
