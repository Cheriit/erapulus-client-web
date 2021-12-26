import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FileTableService} from './file-table.service';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-file-table',
  template: `
    <div *ngIf="tableConfiguration$ | async as tableConfiguration"
         class="table-content">
      <ep-table
        [configuration]="tableConfiguration"
        (tableElementEvent)="handleTableEvent($event)"
        [reload$]="reload$"></ep-table>
    </div>
  `,
  styleUrls: ['./file-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTableComponent implements OnInit, OnDestroy {
  public tableConfiguration$!: Subject<TableConfiguration>;
  public reload$: Subject<void> = new Subject();

  constructor (private readonly fileTableService: FileTableService,
              private readonly subscriptionManager: SubscriptionManagerService,
              private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
    this.tableConfiguration$ = this.fileTableService.getListConfigurationObservable();
    this.subscriptionManager.subscribe(
      this.fileTableService.reloadList$.subscribe(() => {
        this.reloadList();
      }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  public handleTableEvent (event: TableActionEvent): void {
    this.fileTableService.handleTableEvent(event);
  }

  private reloadList (): void {
    this.tableConfiguration$.next(this.fileTableService.getListConfiguration());
    this.reload$.next();
    this.changeDetectorRef.markForCheck();
  }
}
