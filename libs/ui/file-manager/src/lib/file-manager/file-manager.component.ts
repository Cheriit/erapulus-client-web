import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FileUploaderService} from '../file-uploader/file-uploader.service';
import {FileTableService} from '../file-table/file-table.service';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';
import {FileManagerService} from '@erapulus/ui/file-manager';

@Component({
  selector: 'ep-file-manager',
  template: `
    <div>
      <ep-file-uploader *ngIf="hasUpload" [uploadMultiple]="uploadMultiple" [accept]="accept"
                        [patch]="patch" [class.text-right]="uploadMultiple" [class.pb-3]="uploadMultiple"
      ></ep-file-uploader>
      <ep-file-table *ngIf="hasList"></ep-file-table>
    </div>
  `,
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FileUploaderService
    },
    {
      provide: FileTableService
    }
  ]
})
export class FileManagerComponent implements OnInit, OnDestroy {
  @Input() hasUpload = true;
  @Input() hasList = true;
  @Input() uploadMultiple = true;
  @Input() accept = '.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*';
  @Input() fileManagerService!: FileManagerService;
  @Input() patch = false;
  @Output() readonly fileSent: EventEmitter<void> = new EventEmitter<void>();

  constructor (private readonly fileTableService: FileTableService,
              private readonly fileUploaderService: FileUploaderService,
              private readonly subscriptionManager: SubscriptionManagerService,
              private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
    this.subscriptionManager.subscribe(this.fileTableService.reloadList$.subscribe(() => {
      this.fileSent.next();
      this.changeDetectorRef.markForCheck();
    }));
    this.fileUploaderService.setFileManager(this.fileManagerService);
    this.fileTableService.setFileManager(this.fileManagerService);
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }
}
