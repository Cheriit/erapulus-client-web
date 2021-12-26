import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FileUploaderService} from '../file-uploader/file-uploader.service';

@Component({
  selector: 'ep-file-uploader-list',
  template: ``,
  styleUrls: ['./file-uploader-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderListComponent {
  files$ = this.fileUploaderService.files$;

  constructor (private readonly fileUploaderService: FileUploaderService) {
  }
}
