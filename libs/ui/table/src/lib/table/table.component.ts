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
import {FormGroup} from '@angular/forms';
import {debounce, interval, take} from 'rxjs';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {TableConfiguration} from '../table.models';
import {TableDataAccessService} from '../table.data-access.service';

@Component({
  selector: 'ep-table',
  template: `
    <!--    <ep-table-filters></ep-table-filters>-->
    <table>
      <thead>

      </thead>
      <tbody>

      </tbody>
    </table>
    <!--    <ep-table-pagination (pageChange)="pageChanged($event)"></ep-table-pagination>-->
  `,
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit, OnDestroy {
  @Input() configuration!: TableConfiguration;
  @Input() tableDataAccessService!: TableDataAccessService;
  @Output() readonly editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly deleteElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly filterUpdated: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public currentPage!: number;
  public totalCount!: number;
  public offset!: number;
  public content!: T[];
  public loading = false;
  public elements = [];

  constructor (
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly subscriptionManagerService: SubscriptionManagerService) {
  }


  ngOnInit (): void {
    this.loading = true;
    this.currentPage = this.configuration.currentPage;
    this.makeRequest();
    this.subscriptionManagerService.subscribe(
      this.configuration.filters.valueChanges
        .pipe(debounce(() => interval(1000)))
        .subscribe(() => {
          this.loading = true;
          this.makeRequest();
        }));
  }

  ngOnDestroy (): void {
    this.subscriptionManagerService.unsubscribeAll();
  }

  makeRequest (): void {
    this.tableDataAccessService.makeRequest<T>({
      url: this.configuration.url,
      page: this.currentPage,
      pageSize: this.configuration.pageSize,
      parameters: {...this.configuration.parameters, ...this.configuration.filters.value}
    })
      .pipe(take(1))
      .subscribe((result) => {
        this.loading = false;
        this.currentPage = result.payload.currentPage;
        this.totalCount = result.payload.totalCount;
        this.offset = result.payload.offset;
        this.content = result.payload.content;
        this.changeDetectorRef.markForCheck();
      });
  }

  pageChanged (newPageNumber: number): void {
    return;
  }
}
