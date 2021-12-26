import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FileTableComponent} from './file-table/file-table.component';
import {FileTableRowComponent} from './file-table-row/file-table-row.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {FileUploaderListComponent} from './file-uploader-list/file-uploader-list.component';
import {FileManagerComponent} from './file-manager/file-manager.component';

const components = [
  FileTableComponent,
  FileTableRowComponent,
  FileUploaderComponent,
  FileUploaderListComponent,
  FileManagerComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: components
})
export class FileManagerModule {
}
