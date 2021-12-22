import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TableAction, TableColumn} from '../table.models';

@Component({
  selector: 'ep-table-row',
  template: `
    <tr class="">
      <ng-template *ngFor="let cell of columns; trackBy: trackByFn">
        <th *ngIf="cell.bold; else regularCell" [style.width]="cell.width">
        </th>
        <ng-template #regularCell>
          <td [style.width]="cell.width"></td>
        </ng-template>
      </ng-template>
    </tr>`,
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  @Input() actions!: TableAction[];
  @Input() columns!: TableColumn[];
  @Input() element!: object;
  @Output() readonly editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly deleteElement: EventEmitter<number> = new EventEmitter<number>();

  public trackByFn (index: number, element: TableColumn): string {
    return element.key;
  }
}
