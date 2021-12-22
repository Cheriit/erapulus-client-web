import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TableConfiguration} from '../table.models';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'ep-table-header',
  template: `
    <div *ngIf="headerElement$ | async as headerElement">
      <ep-table-row [configuration]="configuration" [isHeader]="true" [element]="headerElement"
                    class="bg-gray-200 border-gray-300 border-b-2">
      </ep-table-row>
    </div>
  `,
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderComponent implements OnInit {
  @Input() configuration!: TableConfiguration;

  public headerElement$: Subject<{ [key: string]: string }> = new Subject<{ [key: string]: string }>();

  constructor (private translateService: TranslateService) {
  }

  public getHeaderElement (): void {
    const headerElements: { [key: string]: string } = this.configuration.columns.reduce((o, column) => Object.assign(o, {[column.key]: `${this.configuration.prefix}${column.key}.header`}), {});
    this.translateService.get(Object.values(headerElements)).subscribe((translations) => {
      let i = 0;
      for (const [key] of Object.entries(headerElements)) {
        headerElements[key] = translations[i] ?? headerElements[key];
        i++;
      }
      this.headerElement$.next(headerElements);
    });
  }

  ngOnInit (): void {
    this.getHeaderElement();
  }
}
