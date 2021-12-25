import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {FormGroup} from '@angular/forms';
import {PostCreateFormService} from './post-create-form.service';
import {TitleService} from '@erapulus/utils/title';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ep-post-create',
  template: `
    <ep-container [loading]="form.pending">
      <ep-header
        [headerType]="headerType.H3">{{'management-panel.create.post.title' | translate}}</ep-header>
      <ep-post-create-form [form]="form" [universityId]="universityId"></ep-post-create-form>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateComponent implements OnInit, OnDestroy {
  public readonly headerType = HeaderType;
  public form!: FormGroup;
  public universityId!: string;

  constructor (
    private readonly postCreateFormService: PostCreateFormService,
    private readonly titleService: TitleService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('management-panel.university.create');
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.form = this.postCreateFormService.createForm(this.universityId);
    this.subscriptionManager.subscribe(this.form.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

}
