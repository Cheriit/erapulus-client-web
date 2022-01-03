import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ep-table-pagination',
  template: `
    <div class="w-full flex justify-between pt-2 px-5">
      <div>
        <img src="/assets/icons/arrow_left.svg" alt="Go Back" [title]="'common.table.action.back' | translate"
             *ngIf="canGoBack"
             (click)="pageChange.emit(-1)"/>
      </div>
      <div>
        <img src="/assets/icons/arrow_right.svg" alt="Go Further" [title]="'common.table.action.next' | translate"
             *ngIf="canGoNext"
             (click)="pageChange.emit(1)"/>
      </div>
    </div>`,
  styleUrls: ['./table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationComponent {
  @Input() canGoNext!: boolean;
  @Input() canGoBack!: boolean;
  @Output() readonly pageChange: EventEmitter<number> = new EventEmitter<number>();
}
