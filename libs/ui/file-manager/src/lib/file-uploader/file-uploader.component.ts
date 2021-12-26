import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FileUploaderService} from './file-uploader.service';

@Component({
  selector: 'ep-file-uploader',
  template: `
    <ep-button (click)="fileInput.click()">
      {{'common.file-manager.upload' | translate}}
      <img src="/assets/icons/upload.svg" icon class="pr-3" alt="Upload"/>
      <input type="file"
             [multiple]="uploadMultiple"
             #fileInput
             (change)="addFilesToUpload($event)"
             [accept]="accept"
             class="hidden"/>
    </ep-button>
    <ep-file-uploader-list *ngIf="uploadMultiple"></ep-file-uploader-list>
  `,
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @Input() uploadMultiple!: boolean;
  @Input() accept!: string;
  @Input() patch!: boolean;

  constructor (private readonly fileUploaderService: FileUploaderService) {
  }

  addFilesToUpload (event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const fileList: FileList = element.files;
      if (this.uploadMultiple) {
        Array.from(fileList).forEach((file) => this.fileUploaderService.addFile(file));
      } else {
        this.fileUploaderService.addFile(fileList[0]);
        this.fileUploaderService.upload(this.patch);
      }
      element.value = '';
    }
  }
}
