import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {ErapulusHelpers, ErapulusProgram, ProgramDataAccessService} from '@erapulus/data-access/erapulus';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-program-show',
  template: `
    <ep-container [loading]="!program">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.program.show.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="program">
          <div class="w-full  px-4 pb-3">
            <ep-text [textType]="textType.LARGE">{{'management-panel.program.show.name' | translate}}</ep-text>
            <ep-text [textType]="textType.SMALL">{{program.name}} ({{program.abbrev}})</ep-text>
          </div>
          <div class="w-full px-4 pb-5" *ngIf="program.description">
            <ep-text
              [textType]="textType.LARGE">{{'management-panel.program.show.description' | translate}}</ep-text>
            <markdown [data]="program.description"></markdown>
          </div>
        </div>
        <div class="footer-buttons">
          <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
            {{'management-panel.program.action.cancel' | translate}}
            <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
          <ep-button (click)="edit()">
            {{'management-panel.program.action.edit' | translate}}
            <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
        </div>
      </div>
    </ep-container>
    <ep-module-list></ep-module-list>
    <ep-program-files></ep-program-files>
  `,
  styleUrls: ['./program-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramShowComponent implements OnInit {
  public program?: ErapulusProgram;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;
  private universityId?: string;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly programDataAccessService: ProgramDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.program.show');
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId: string = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const id: string = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.programDataAccessService.getProgram({
      id,
      facultyId,
      universityId: this.universityId ?? '-1'
    }))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.program = response.payload as ErapulusProgram;
        this.changeDetectorRef.markForCheck();
      });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId,
      NavigationRoutes.FACULTY,
      this.program?.facultyId,
      NavigationRoutes.PROGRAM,
      this.program?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
