import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {UniversityTableService} from './university-table.service';
import {AuthFacade} from '@erapulus/utils/auth';
import {HeaderType} from '@erapulus/ui/components';
import {Location} from '@angular/common';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-university-table',
  template: `
    <ep-container>
      <ep-header [headerType]="headerType.H3">{{'management-panel.university.list.header' | translate}}</ep-header>
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
export class UniversityTableComponent implements OnInit, OnDestroy {
  public reload$: Subject<void> = new Subject();
  public tableConfiguration$: Subject<TableConfiguration> = this.universityTableService.getListConfigurationObservable();
  public headerType = HeaderType;
  public _tableConfiguration!: TableConfiguration;
  public lastParameters!: Params;

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly universityTableService: UniversityTableService,
    private readonly authFacade: AuthFacade,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly router: Router,
    private readonly subscriptionManager: SubscriptionManagerService
  ) {
  }

  ngOnInit (): void {
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
    this._tableConfiguration = this.universityTableService.getListConfiguration();
    this.tableConfiguration$.next(this._tableConfiguration);
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }
}
