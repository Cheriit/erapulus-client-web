import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableColumn, TableConfiguration} from '../table.models';

@Component({
  selector: 'ep-table-row',
  template: `
    <div class="flex w-full" [class.withActions]="configuration.actions"
         (click)="selectElement.emit(element['id'])">
      <div class="cell w-16 text-right">
        {{rowNumber}}.
      </div>
      <div *ngFor="let column of configuration.columns; trackBy: trackByFn" [style.width.%]="column.widthPercentage"
           [class.font-bold]="column.bold" [class.text-right]="column.numeric" class="cell"
           [title]="element[column.key]">
        {{element[column.key]}}
      </div>
      <div *ngIf="configuration.actions.length > 0" class="cell w-10">
        <ep-table-actions *ngIf="!isHeader"></ep-table-actions>
      </div>
    </div>`,
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit {
  @Input() rowNumber!: number;
  @Input() configuration!: TableConfiguration;
  @Input() element!: { [key: string]: any };
  @Input() isHeader = false;
  @Output() readonly selectElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly deleteElement: EventEmitter<number> = new EventEmitter<number>();

  public trackByFn (index: number, element: TableColumn): string {
    return element.key;
  }

  ngOnInit (): void {
    console.log(this.element);
  }
}
