import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusFaculty, ErapulusHelpers, FacultyDataAccessService} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!faculty">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.faculty.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="faculty">
          <div class="w-full px-4">
            <div class="pb-3 w-full">
              <ep-text [textType]="textType.LARGE">{{'management-panel.faculty.show.name' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{faculty.name}}</ep-text>
            </div>
            <div class="pb-3 w-full">
              <ep-text [textType]="textType.LARGE">{{'management-panel.faculty.show.email' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{faculty.email}}</ep-text>
            </div>
            <div class="pb-3 w-full">
              <ep-text [textType]="textType.LARGE">{{'management-panel.faculty.show.address' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{faculty.address}}</ep-text>
            </div>
          </div>
          <div class="footer-buttons w-full">
            <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
              {{'management-panel.create.faculty.cancel' | translate}}
              <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
            <ep-button (click)="edit()">
              {{'management-panel.create.faculty.edit' | translate}}
              <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
          </div>
        </div>
      </div>
    </ep-container>
  `,
  styleUrls: ['./faculty-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacultyShowComponent implements OnInit {
  public faculty?: ErapulusFaculty;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;


  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly facultyDataAccessService: FacultyDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.faculty.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.facultyDataAccessService.getFaculty({facultyId, universityId}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.faculty = response.payload as ErapulusFaculty;
        this.changeDetectorRef.markForCheck();
      });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.faculty?.universityId,
      NavigationRoutes.FACULTY,
      this.faculty?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
