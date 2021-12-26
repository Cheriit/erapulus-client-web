import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ep-file-manager',
  template: `
    <ep-file-uploader *ngIf="hasUpload"></ep-file-uploader>
    <ep-file-table></ep-file-table>
  `,
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent {
  @Input() hasUpload = true;
  @Input() baseUrl!: string;
}
