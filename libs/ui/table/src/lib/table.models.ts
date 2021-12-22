import {FormGroup} from '@angular/forms';

export interface TableRequest {
  url: string,
  parameters: { [key: string]: string },
  page: number,
  pageSize: number
}

export interface TableResponse<T> {
  status: number,
  payload: {
    content: T[],
    currentPage: number,
    offset: number,
    pageSize: number,
    totalCount: number
  },
  message: string
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
  prefix: string,
  currentPage: number,
  pageSize: number,
  filters: FormGroup,
  actions: TableAction[],
  columns: TableColumn[],
  parameters: { [key: string]: string | undefined }
}
