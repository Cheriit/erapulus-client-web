import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusHelpers, ErapulusModule, ModuleDataAccessService} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-module-show',
  template: `
    <ep-container [loading]="!module">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.module.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="module">
          <div class="w-full  px-4 pb-3">
            <ep-text [textType]="textType.LARGE">{{'management-panel.module.show.name' | translate}}</ep-text>
            <ep-text [textType]="textType.SMALL">{{module.name}} ({{module.abbrev}})</ep-text>
          </div>
          <div class="w-full px-4 pb-5" *ngIf="module.description">
            <ep-text
              [textType]="textType.LARGE">{{'management-panel.module.show.description' | translate}}</ep-text>
            <markdown [data]="module.description"></markdown>
          </div>
        </div>
        <div class="footer-buttons">
          <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
            {{'management-panel.create.module.cancel' | translate}}
            <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
          <ep-button (click)="edit()">
            {{'management-panel.create.module.edit' | translate}}
            <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
        </div>
      </div>
    </ep-container>
    <ep-module-files></ep-module-files>
  `,
  styleUrls: ['./module-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleShowComponent implements OnInit {
  public module?: ErapulusModule;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;
  private universityId?: string;
  private facultyId?: string;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly moduleDataAccessService: ModuleDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.module.show');
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId: string = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    const moduleId: string = this.route.snapshot.paramMap.get('module_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.moduleDataAccessService.getModule({
      id: moduleId,
      programId,
      facultyId: this.facultyId ?? '-1',
      universityId: this.universityId ?? '-1'
    }))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.module = response.payload as ErapulusModule;
        this.changeDetectorRef.markForCheck();
      });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId,
      NavigationRoutes.FACULTY,
      this.facultyId,
      NavigationRoutes.PROGRAM,
      this.module?.programId,
      NavigationRoutes.MODULE,
      this.module?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
