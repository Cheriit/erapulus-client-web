import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ep-table-filters',
  template: `
    <form [formGroup]="form">
      <div class="flex flex-wrap overflow-hidden">
        <div *ngFor="let control of getControls(); trackBy: trackByFn" class="w-1/2 md:w-1/3 px-4 pb-3">
          <ep-input
            [label]="prefix + 'filter.' + control[0] + '.label'| translate"
            [control]="control[1]"
            [placeholder]="prefix + 'filter.' + control[0] + '.placeholder'| translate"
          ></ep-input>
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFiltersComponent {
  @Input() prefix!: string;
  @Input() form!: FormGroup;

  public trackByFn (index: number, element: [string, FormControl]): string {
    return element[0];
  }

  public getControls (): [string, FormControl][] {
    return (Object.entries(this.form.controls) as [string, FormControl][]);
  }
}
