import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {TableRowComponent} from './table-row/table-row.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableFiltersComponent} from './table-filters/table-filters.component';
import {TableHeaderComponent} from './table-header/table-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TableActionsComponent} from './table-actions/table-actions.component';
import {ReactiveFormsModule} from '@angular/forms';

export const tableRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    UiComponentsModule,
    ReactiveFormsModule
  ],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
    TablePaginationComponent,
    TableFiltersComponent,
    TableActionsComponent
  ]
})
export class TableModule {
}
