import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthFacade, AuthUser} from '@erapulus/utils/auth';
import {TitleService} from '@erapulus/utils/title';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderType} from '@erapulus/ui/components';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {BuildingListService} from './building-list.service';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-building-list',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.building.list.header' | translate}}</ep-header>
      <div *ngIf="tableConfiguration$ | async as tableConfiguration"
           class="min-h-[200px] min-w-[600px] mx-[-24px]">
        <ep-table
          [configuration]="tableConfiguration"
          (tableElementEvent)="handleTableEvent($event)"
          [reload$]="reload$"></ep-table>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingListComponent implements OnInit, OnDestroy {
  public user$: Observable<AuthUser | undefined> = this.authFacade.authUser$;
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
    private readonly universityTableService: BuildingListService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly subscriptionManager: SubscriptionManagerService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.tableConfiguration$ = this.universityTableService.getListConfigurationObservable(this.universityId);

    this.titleService.setTitle('management-panel.building.list');
    this.subscriptionManager.subscribe(
      this.universityTableService.reloadList$.subscribe(() => {
        this.reloadList();
      }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }


  public handleTableEvent (event: TableActionEvent): void {
    this.universityTableService.handleTableEvent(event);
  }

  private reloadList (): void {
    this._tableConfiguration = this.universityTableService.getListConfiguration(this.universityId);
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }

}
