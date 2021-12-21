import {FormGroup} from '@angular/forms';

export interface TableRequest {
  url: string,
  filters: { [key: string]: string },
  page: number
}

export enum TableAction {
  EDIT = 'edit',
  DELETE = 'delete'
}

export interface TableColumn {
  key: string,
  width?: string,
  numeric?: boolean,
  bold?: boolean
}

export interface TableConfiguration {
  url: string,
  currentPage: number,
  pageSize: number,
  filters: FormGroup,
  actions: TableAction[]
  columns: TableColumn[]
}
