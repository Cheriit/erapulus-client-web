import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileUploaderService} from './file-uploader.service';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-file-uploader',
  template: `
    <ep-button (click)="fileInput.click()" [disabled]="disabled">
      {{(uploadMultiple ? 'common.file-manager.select' : 'common.file-manager.upload') | translate}}
      <img [src]="uploadMultiple ? '/assets/icons/select.svg' :'/assets/icons/upload.svg'" icon class="pr-3"
           [alt]="(uploadMultiple ? 'common.file-manager.select' : 'common.file-manager.upload') | translate"/>
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
export class FileUploaderComponent implements OnInit, OnDestroy {
  uploadFinish$ = this.fileUploaderService.uploadFinish$;
  @Input() uploadMultiple!: boolean;
  @Input() accept!: string;
  @Input() patch!: boolean;
  public disabled = false;

  constructor (private readonly fileUploaderService: FileUploaderService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly subscriptionManager: SubscriptionManagerService) {
  }

  ngOnInit (): void {
    this.subscriptionManager.subscribe(this.uploadFinish$.subscribe((isFinished) => {
      this.disabled = !isFinished;
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
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
