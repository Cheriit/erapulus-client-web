import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TableColumn} from '@erapulus/ui/table';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ep-table-filters',
  template: `
    <div></div>`,
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFiltersComponent {
  @Input() form!: FormGroup;

  public trackByFn (index: number, element: TableColumn): string {
    return element.key;
  }
}
