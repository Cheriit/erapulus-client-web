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
import {TableConfiguration, TableDataAccessService, TableRequest} from '@erapulus/ui/table';
import {FormGroup} from '@angular/forms';
import {take} from 'rxjs';
import {
  SubscriptionManagerService
} from '../../../../../utils/subscription-manager/src/lib/subscription-manager.service';

@Component({
  selector: 'ep-table',
  template: `
    <ep-table-filters></ep-table-filters>
    <p>table works!</p>
    <ep-table-pagination></ep-table-pagination>`,
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends TableRequest> implements OnInit, OnDestroy {
  @Input() configuration!: TableConfiguration;
  @Input() tableDataAccessService!: TableDataAccessService;
  @Output() readonly editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly deleteElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly filterUpdated: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public loading = false;
  public elements = [];

  constructor (private changeDetectorRef: ChangeDetectorRef, private subscriptionManagerService: SubscriptionManagerService) {
  }


  ngOnInit (): void {
    this.loading = true;

    this.subscriptionManagerService.subscribe(this.configuration.filters.valueChanges.subscribe(() => {
      this.loading = true;
      this.makeRequest();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManagerService.unsubscribeAll();
  }

  makeRequest (): T {
    this.tableDataAccessService.makeRequest()
      .pipe(take(1))
      .subscribe((result) => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      });
  }
}
