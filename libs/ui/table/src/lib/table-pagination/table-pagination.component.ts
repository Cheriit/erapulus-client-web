import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TableColumn} from '../table.models';

@Component({
  selector: 'ep-table-pagination',
  template: `
    <div></div>`,
  styleUrls: ['./table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationComponent {
  @Input() currentPage!: number;
  @Input() elementSize!: number;
  @Output() readonly pageChange: EventEmitter<number> = new EventEmitter<number>();

  public trackByFn (index: number, element: TableColumn): string {
    return element.key;
  }
}
