import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TableAction, TableActionEvent} from '../table.models';

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
        <div class="new-button">
          <ep-button (click)="goToNew()"
                     class="absolute bottom-[33px]"
                     style="bottom: 33px" *ngIf="displayNew()">
            {{prefix + 'new-button' | translate}}
            <img src="/assets/icons/add.svg" icon class="pr-3" alt="Add"/>
          </ep-button>
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
  @Input() actions!: TableAction[];
  @Output() readonly newEvent: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();

  public trackByFn (index: number, element: [string, FormControl]): string {
    return element[0];
  }

  public getControls (): [string, FormControl][] {
    return (Object.entries(this.form.controls) as [string, FormControl][]);
  }

  public goToNew (): void {
    this.newEvent.next({
      type: TableAction.NEW,
      content: ''
    });
  }

  public displayNew (): boolean {
    return this.actions.includes(TableAction.NEW);
  }
}
