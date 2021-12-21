import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {TableRowComponent} from './table-row/table-row.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableFiltersComponent} from './table-filters/table-filters.component';

export const tableRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TableComponent,
    TableRowComponent,
    TablePaginationComponent,
    TableFiltersComponent
  ]
})
export class TableModule {
}
