import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FileUploaderService} from '../file-uploader/file-uploader.service';
import {HeaderType} from '@erapulus/ui/components';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

@Component({
  selector: 'ep-file-uploader-list',
  template: `
    <div *ngIf="(files$ | async) as files">
      <div class="mx-[-24px] py-5" *ngIf="files.length">
        <ep-header [headerType]="headerType.H4"
                   class="header">{{'common.file-uploader.files-to-send' | translate}}</ep-header>
        <div class="item"
             *ngFor="let file of files; let index = index; trackBy: trackByFn">
          <div>{{file.name}}</div>
          <img (click)="removeItem(index)"
               alt="Remove"
               class="remove-icon"
               src="/assets/icons/crossbar_default.svg"/>
        </div>
      </div>
      <ep-button class="py-4" (click)="upload()" *ngIf="files.length" [disabled]="disabled">
        <img src="/assets/icons/upload.svg" icon class="pr-3" alt="Upload"/>
        {{'common.file-manager.upload' | translate}}
      </ep-button>
    </div>`,
  styleUrls: ['./file-uploader-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderListComponent implements OnInit, OnDestroy {
  files$ = this.fileUploaderService.files$;
  uploadFinish$ = this.fileUploaderService.uploadFinish$;
  public headerType = HeaderType;
  public disabled = false;

  constructor (
    private readonly fileUploaderService: FileUploaderService,
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

  public trackByFn (index: number, file: File): string {
    return file.name;
  }

  public removeItem (index: number): void {
    this.fileUploaderService.removeFile(index);
    this.changeDetectorRef.markForCheck();
  }

  public upload (): void {
    this.fileUploaderService.upload();
  }
}
