import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FileTableComponent} from './file-table/file-table.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {FileUploaderListComponent} from './file-uploader-list/file-uploader-list.component';
import {FileManagerComponent} from './file-manager/file-manager.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';

const components = [
  FileTableComponent,
  FileUploaderComponent,
  FileUploaderListComponent,
  FileManagerComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    UiComponentsModule,
    TranslateModule
  ],
  exports: components
})
export class FileManagerModule {
}
