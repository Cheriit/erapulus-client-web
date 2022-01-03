import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {PostEditFormService} from './post-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusHelpers, ErapulusPost, PostDataAccessService} from '@erapulus/data-access/erapulus';
import {HttpStatusCode} from '@angular/common/http';
import {NavigationService} from '@erapulus/utils/navigation';

@Component({
  selector: 'ep-post-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.post.edit.title' | translate}}</ep-header>
        <ep-post-edit-form [form]="form" *ngIf="form"></ep-post-edit-form>
      </div>
    </ep-container>
  `,
  styleUrls: ['./post-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public post!: ErapulusPost;
  public loading = true;

  constructor (
    private readonly route: ActivatedRoute,
    private readonly postEditFormService: PostEditFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly postDataAccessService: PostDataAccessService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.post.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const postId: string = this.route.snapshot.paramMap.get('post_id') ?? '-1';
    ErapulusHelpers.handleRequest(this.postDataAccessService.getPost({postId, universityId}))
      .subscribe((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          return this.navigationService.back();
        }
        this.post = response.payload as ErapulusPost;
        this.form = this.postEditFormService.createForm(this.post);
        this.loading = false;
        this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
          this.changeDetectorRef.markForCheck();
        }));
        this.changeDetectorRef.markForCheck();
      }
      );
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
