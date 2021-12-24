import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterConfiguration, FilterElementType, TableAction, TableActionEvent} from '../table.models';

@Component({
  selector: 'ep-table-filters',
  template: `
    <form [formGroup]="form">
      <div class="flex flex-wrap">
        <div *ngFor="let control of getControls(); trackBy: trackByFn" class="w-1/2 md:w-1/3 px-4 pb-3">
          <ng-container [ngSwitch]="filterConfiguration[control[0]].type">
            <ep-input
              *ngSwitchCase="filterElementTypes.TEXT"
              [label]="prefix + 'filter.' + control[0] + '.label'| translate"
              [control]="control[1]"
              [placeholder]="prefix + 'filter.' + control[0] + '.placeholder'| translate"
            ></ep-input>
            <ep-select
              *ngSwitchCase="filterElementTypes.SELECT"
              [placeholder]="prefix + 'filter.' + control[0] + '.placeholder'| translate"
              [label]="prefix + 'filter.' + control[0] + '.label'| translate"
              [control]="control[1]"
              [accessor]="filterConfiguration[control[0]].accessor"
            ></ep-select>
          </ng-container>
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
  @Input() filterConfiguration!: { [key: string]: FilterConfiguration };
  @Input() actions!: TableAction[];
  @Output() readonly newEvent: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();
  public readonly filterElementTypes = FilterElementType;

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
