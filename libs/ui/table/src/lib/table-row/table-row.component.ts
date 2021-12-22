import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TableActionEvent, TableColumn, TableConfiguration} from '../table.models';

@Component({
  selector: 'ep-table-row',
  template: `
    <div class="flex w-full border-b-2 "
         [class.cursor-pointer]="!isHeader"
         [class.withActions]="configuration.actions">
      <div class="cell w-16 text-right">
        {{rowNumber}}.
      </div>
      <div *ngFor="let column of configuration.columns; trackBy: trackByFn" [style.width.%]="column.widthPercentage"
           [class.font-bold]="column.bold" [class.text-right]="column.numeric" class="cell"
           [title]="element[column.key]">
        {{element[column.key]}}
      </div>
      <div *ngIf="configuration.actions.length > 0" class="action-cell w-20">
        <ep-table-actions *ngIf="!isHeader" (tableElementEvent)="tableElementEvent.emit($event)"
                          [actions]="configuration.actions" [id]="element['id']"></ep-table-actions>
      </div>
    </div>`,
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  @Input() rowNumber!: number;
  @Input() configuration!: TableConfiguration;
  @Input() element!: { [key: string]: string };
  @Input() isHeader = false;
  @Output() readonly tableElementEvent: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();

  public trackByFn (index: number, element: TableColumn): string {
    return element.key;
  }
}
