import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {TableConfiguration} from '../table.models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ep-table-header',
  template: `
    <ep-table-row [configuration]="configuration" [isHeader]="true" [element]="headerElement ?? {}"
                  class="bg-gray-200 border-gray-300 border-b-2">
    </ep-table-row>
  `,
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeaderComponent implements OnInit {
  @Input() configuration!: TableConfiguration;

  public headerElement?: { [key: string]: string };

  constructor (private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef) {
  }

  public getHeaderElement (): void {
    const headerElements: { [key: string]: string } = this.configuration.columns.reduce((o, column) => Object.assign(o, {[column.key]: `${this.configuration.prefix}${column.key}.header`}), {});
    this.translateService.get(Object.values(headerElements)).subscribe((translations) => {

      for (const [
        key,
        value
      ] of Object.entries(headerElements)) {
        headerElements[key] = translations[value] ?? headerElements[key];
      }
      this.headerElement = headerElements;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit (): void {
    this.getHeaderElement();
  }
}
