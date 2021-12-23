import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TableAction, TableActionEvent} from '../table.models';

@Component({
  selector: 'ep-table-actions',
  template: `
    <div class="w-full h-full relative flex justify-between">
      <img src="/assets/icons/edit.svg" [alt]="'common.table.action.edit' | translate"
           [title]="'common.table.action.edit' | translate" class="h-6 block transition hover:scale-150 cursor-pointer"
           *ngIf="actions.includes(tableActions.EDIT)" (click)="clickEdit($event)">
      <img src="/assets/icons/delete.svg" [alt]="'common.table.action.delete' | translate"
           [title]="'common.table.action.delete' | translate"
           class="h-6 block transition hover:scale-150 cursor-pointer"
           *ngIf="actions.includes(tableActions.DELETE)" (click)="clickDelete($event)">
    </div>
  `,
  styleUrls: ['./table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableActionsComponent {
  @Input() id!: string;
  @Input() actions!: TableAction[];
  @Output() readonly tableElementEvent: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();

  public tableActions = TableAction;

  clickEdit (event: Event): void {
    event.stopPropagation();
    this.tableElementEvent.next({
      type: TableAction.EDIT,
      content: this.id
    });
  }

  clickDelete (event: Event): void {
    event.stopPropagation();
    this.tableElementEvent.next({
      type: TableAction.DELETE,
      content: this.id
    });
  }

}
