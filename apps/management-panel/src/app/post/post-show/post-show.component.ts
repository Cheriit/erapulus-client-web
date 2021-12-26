import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonType, HeaderType, TextType} from '@erapulus/ui/components';
import {TitleService} from '@erapulus/utils/title';
import {NavigationRoutes, NavigationService} from '@erapulus/utils/navigation';
import {ErapulusHelpers, ErapulusPost, PostDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'ep-university-show',
  template: `
    <ep-container [loading]="!post">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.show.post.title' | translate}}</ep-header>
        <div class="flex flex-wrap mt-10" *ngIf="post">
          <div class="w-full px-4">
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.post.show.title' | translate}}</ep-text>
              <ep-text [textType]="textType.SMALL">{{post.title}}</ep-text>
            </div>
            <div class="pb-3">
              <ep-text [textType]="textType.LARGE">{{'management-panel.post.show.content' | translate}}</ep-text>
              <markdown [data]="post.content"></markdown>
            </div>
          </div>
          <div class="footer-buttons">
            <ep-button [type]="buttonType.SECONDARY" (click)="cancel()">
              {{'management-panel.create.post.cancel' | translate}}
              <img src="/assets/icons/arrow_left.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
            <ep-button (click)="edit()">
              {{'management-panel.create.post.edit' | translate}}
              <img src="/assets/icons/edit_white.svg" icon class="pr-3" alt="Add"/>
            </ep-button>
          </div>
        </div>
      </div>
    </ep-container>
  `,
  styleUrls: ['./post-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostShowComponent implements OnInit {
  public post?: ErapulusPost;
  public readonly buttonType = ButtonType;
  public readonly headerType = HeaderType;
  public readonly textType = TextType;


  constructor (
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly postDataAccessService: PostDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.post.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const postId: string = this.route.snapshot.paramMap.get('post_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.postDataAccessService.getPost({postId, universityId})).subscribe((response) => {
      if (response.status !== HttpStatusCode.Ok) {
        return this.navigationService.back();
      }
      this.post = response.payload as ErapulusPost;
      this.changeDetectorRef.markForCheck();
    });
  }

  public edit (): void {
    this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.post?.universityId,
      NavigationRoutes.POST,
      this.post?.id,
      NavigationRoutes.EDIT
    ]).then();
  }

  public cancel (): void {
    this.navigationService.back();
  }

}
