import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {debounce, interval, Observable, take} from 'rxjs';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {TableAction, TableActionEvent, TableConfiguration} from '../table.models';
import {TableDataAccessService} from '../table.data-access.service';

@Component({
  selector: 'ep-table',
  template: `
    <ep-table-filters [form]="configuration.filters" [filterConfiguration]="configuration.filterConfiguration"
                      [prefix]="configuration.prefix"
                      [actions]="configuration.actions"
                      (newEvent)="tableElementEvent.emit($event)"></ep-table-filters>
    <div class="w-full">
      <ep-table-header [configuration]="configuration"></ep-table-header>
      <ng-container *ngIf="content && content.length > 0; else noContent">
        <ep-table-row *ngFor="let element of content; let index = index" [configuration]="configuration"
                      class="last:border-2 border-gray-300 odd:bg-gray-100 transition"
                      [class.hover:bg-gray-200]="canSelect()"
                      [class.cursor-pointer]="canSelect()"
                      [element]="element" [rowNumber]="offset + index + 1"
                      (click)="rowClick(element['id'])"
                      (tableElementEvent)="tableElementEvent.emit($event)"></ep-table-row>
        <ep-table-pagination
          *ngIf="configuration.hasPagination"
          (pageChange)="pageChanged($event)"
          [canGoNext]="(currentPage + 1) * (configuration.pageSize ?? 0) < totalCount"
          [canGoBack]="currentPage !== 0"></ep-table-pagination>
      </ng-container>
      <ng-template #noContent>
        <ng-container *ngIf="loading === true; else notFound">
          <div>
            <ep-spinner class="m-auto w-14 py-10"></ep-spinner>
          </div>
        </ng-container>
        <ng-template #notFound>
          <div>
            <ep-text
              class="text-center py-10 text-gray-500 w-full">{{configuration.prefix + 'not-found' | translate}}</ep-text>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() configuration!: TableConfiguration;
  @Input() reload$!: Observable<void>;
  @Output() readonly tableElementEvent: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();
  @Output() readonly currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  public currentPage!: number;
  public totalCount!: number;
  public offset!: number;
  public content!: { [key: string]: string }[];
  public loading = false;
  public elements = [];
  public tableActionEvent = TableAction;


  constructor (
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManagerService: SubscriptionManagerService,
    private readonly tableDataAccessService: TableDataAccessService
  ) {
  }


  ngOnInit (): void {
    this.loading = true;
    this.currentPage = this.configuration?.currentPage ?? 0;
    this.subscriptionManagerService.subscribe(
      this.reload$.subscribe(() => this.makeRequest()));
    this.makeRequest();
    this.subscriptionManagerService.subscribe(
      this.configuration.filters.valueChanges
        .pipe(debounce(() => interval(1000)))
        .subscribe(() => {
          this.makeRequest();
        }));
  }

  ngOnDestroy (): void {
    this.subscriptionManagerService.unsubscribeAll();
  }

  makeRequest (): void {
    this.loading = true;
    this.content = [];
    this.changeDetectorRef.markForCheck();
    this.tableDataAccessService.makeRequest<{ [key: string]: string }>({
      url: this.configuration.url,
      page: this.currentPage,
      pageSize: this.configuration.pageSize ?? 10,
      parameters: {...this.configuration.parameters, ...this.configuration.filters.value}
    })
      .pipe(take(1))
      .subscribe((result) => {
        this.loading = false;
        if (result.payload.content?.length === 0 && result.payload.currentPage !== 0) {
          this.currentPage = 0;
          this.makeRequest();
        } else {
          this.currentPage = result.payload.currentPage;
          this.totalCount = result.payload.totalCount;
          this.offset = result.payload.offset;
          this.content = result.payload.content;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  pageChanged (pageChange: number): void {
    this.currentPage += pageChange;
    this.makeRequest();
    this.currentPageChange.emit(this.currentPage);
  }

  public canSelect (): boolean {
    return this.configuration.actions.includes(TableAction.SELECT);
  }

  rowClick (id: string): void {
    if (this.canSelect()) {
      this.tableElementEvent.next({
        content: id,
        type: TableAction.SELECT
      });
    }
  }
}
