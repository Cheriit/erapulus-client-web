import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {PostEditFormService} from './post-edit-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ErapulusPost, PostDataAccessService} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-post-edit',
  template: `
    <ep-container [loading]="loading || form.pending">
      <div class="section-content">
        <ep-header
          [headerType]="headerType.H3">{{'management-panel.edit.post.title' | translate:({post: post?.title ?? ''})}}</ep-header>
        <ep-university-edit-form [form]="form" *ngIf="form"></ep-university-edit-form>
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
    private readonly postDataAccessService: PostDataAccessService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.post.edit');
    const universityId: string = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const postId: string = this.route.snapshot.paramMap.get('post_id') ?? '-1';
    this.postDataAccessService.getPost({postId, universityId})
      .pipe(take(1))
      .subscribe((
        {payload}) => {
        this.post = payload;
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
