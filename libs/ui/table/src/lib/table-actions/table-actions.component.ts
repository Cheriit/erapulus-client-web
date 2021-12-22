import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TableColumn} from '../table.models';

@Component({
  selector: 'ep-table-actions',
  template: `
    <div class="w-full h-full relative flex">
      <img src="/assets/icons/dots.svg" class="m-auto h-6" alt="Actions">
    </div>
  `,
  styleUrls: ['./table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableActionsComponent {
  @Input() column!: TableColumn;
}
