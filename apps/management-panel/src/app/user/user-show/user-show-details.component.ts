import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {Router} from '@angular/router';
import {ErapulusUser, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {take} from 'rxjs';

@Component({
  selector: 'ep-user-show-details',
  template: `
    <div class="flex flex-wrap mt-10">
      <div class="w-full md:w-1/2 px-4">
        <div class="pb-3">
          <ep-text [textType]="textType.LARGE">{{'management-panel.user.show.name' | translate}}</ep-text>
          <ep-text [textType]="textType.SMALL">{{user.firstName}} {{user.lastName}}</ep-text>
        </div>
        <div class="pb-3">
          <ep-text [textType]="textType.LARGE">{{'management-panel.user.show.email' | translate}}</ep-text>
          <ep-text [textType]="textType.SMALL">{{user.email}}</ep-text>
        </div>
        <div class="pb-3" *ngIf="user.phoneNumber">
          <ep-text [textType]="textType.LARGE">{{'management-panel.user.show.phone' | translate}}</ep-text>
          <ep-text [textType]="textType.SMALL">{{user.phoneNumber}}</ep-text>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-4 ">
        <div class="pb-3">
          <ep-text [textType]="textType.LARGE">{{'management-panel.user.show.type' | translate}}</ep-text>
          <ep-text [textType]="textType.SMALL">{{'common.role.' + user.type.toLowerCase() | translate}}</ep-text>
        </div>
        <div class="pb-3" *ngIf="universityName">
          <ep-text [textType]="textType.LARGE">{{'management-panel.user.show.type' | translate}}</ep-text>
          <ep-text [textType]="textType.SMALL">{{universityName}}</ep-text>
        </div>
      </div>
    </div>
    <div class="buttons">
      <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
        {{'management-panel.create.user.cancel' | translate}}
        <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
      </ep-button>
      <ep-button (click)="edit()">
        {{'management-panel.create.user.edit' | translate}}
        <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
      </ep-button>
    </div>
  `,
  styleUrls: ['./user-show-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserShowDetailsComponent implements OnInit {
  @Input() user!: ErapulusUser;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;
  public universityName?: string;


  constructor (
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    public readonly universityDataAccessService: UniversityDataAccessService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.USER,
      this.user.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

  ngOnInit (): void {
    if (this.user.university && this.user.university !== '0') {
      this.universityDataAccessService.getUniversity({id: this.user.university})
        .pipe(take(1))
        .subscribe((universityResponse) => {
          this.universityName = universityResponse.payload.name;
          this.changeDetectorRef.markForCheck();
        });

    }
  }
}
