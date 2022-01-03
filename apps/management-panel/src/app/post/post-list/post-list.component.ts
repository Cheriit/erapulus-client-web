import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {debounce, interval, Subject, take} from 'rxjs';
import {AuthFacade} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {PostListParameters, PostListService} from './post-list.service';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-post-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.post.list.header' | translate}}</ep-header>
      <div *ngIf="tableConfiguration$ | async as tableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="tableConfiguration"
          (tableElementEvent)="handleTableEvent($event)"
          (currentPageChange)="paginationChanged($event)"
          [reload$]="reload$"></ep-table>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit, OnDestroy {
  public headerType = HeaderType;
  public reload$: Subject<void> = new Subject();
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;
  public tableConfiguration$!: Subject<TableConfiguration>;
  private universityId!: string;

  constructor (
    private readonly authFacade: AuthFacade,
    private readonly titleService: TitleService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postListService: PostListService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.tableConfiguration$ = this.postListService.getListConfigurationObservable(this.getBaseParameters());

    this.subscriptionManager.subscribe(
      this.postListService.reloadList$.subscribe(() => {
        this.reloadList();
      }));

    this.activatedRoute.queryParams.pipe(take(1)).subscribe((parameters) => {
      this.lastParameters = parameters;
      this.reloadList();
    });

    this.subscriptionManager.subscribe(
      this._tableConfiguration.filters.valueChanges
        .pipe(debounce(() => interval(1000)))
        .subscribe(() => {
          this.updateRoute();
        }));

    this.titleService.setTitle('management-panel.post.list.title');
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public paginationChanged (page: number): void {
    this._tableConfiguration.currentPage = page;
    this.updateRoute();
  }

  public handleTableEvent (event: TableActionEvent): void {
    this.postListService.handleTableEvent(event);
  }

  private updateRoute (): void {
    this.location.go(
      `${this.router.url.split('?')[0]}?post_page=${this._tableConfiguration.currentPage}&post_title=${this._tableConfiguration.filters.value['title']}&post_from=${this._tableConfiguration.filters.value['from']}&post_to=${this._tableConfiguration.filters.value['to']}`);
  }

  private reloadList (): void {
    this._tableConfiguration = this.postListService.getListConfiguration(this.getBaseParameters());
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

  private getBaseParameters (): PostListParameters {
    return {
      universityId: this.universityId,
      dateFrom: this.lastParameters?.post_from ?? '',
      dateTo: this.lastParameters?.post_to ?? '',
      page: this.lastParameters?.post_page ?? 0,
      title: this.lastParameters?.post_title ?? '',
      pageSize: 10
    };
  }

}
