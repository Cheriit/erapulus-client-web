import {Injectable} from '@angular/core';
import {FileManagerService} from '../file-manager.service';
import {catchError, Subject, take, tap, throwError} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileTableService} from '../file-table/file-table.service';

@Injectable({
  providedIn: 'any'
})
export class FileUploaderService {
  files$: Subject<File[]> = new Subject<File[]>();
  uploadFinish$: Subject<boolean> = new Subject<boolean>();
  files: File[] = [];
  private fileManagerService?: FileManagerService;

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly fileTableService: FileTableService) {
  }

  setFileManager (fileManagerService: FileManagerService): void {
    this.fileManagerService = fileManagerService;
  }

  addFile (file: File): void {
    for (let i = 0; i < this.files.length; i++) {
      if (file.name === this.files[i].name) {
        return;
      }
    }
    this.files.push(file);
    this.files$.next(this.files);
  }

  removeFile (index: number): void {
    if (this.files.length > index) {
      this.files.splice(index, 1);
      this.files$.next(this.files);
    }
  }

  upload (patch = false): void {
    let filesSent = this.files.length;
    let removedCount = 0;
    this.files$.next(this.files);
    this.uploadFinish$.next(false);
    this.files.forEach((file, index) => {
      const formData: FormData = new FormData();
      formData.append('file', file);
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'delete');
      const request = patch
        ? this.http.patch(this.fileManagerService?.getBaseRequestUrl() ?? '', formData, {headers, reportProgress: true})
        : this.http.post(this.fileManagerService?.getBaseRequestUrl() ?? '', formData, {headers, reportProgress: true});
      request.pipe(
        take(1),
        tap(() => {
          filesSent--;
          if (filesSent === 0) {
            this.fileTableService.reloadList$.next();
            this.uploadFinish$.next(true);
          }
        }),
        catchError((error) => {
          filesSent--;
          return throwError(() => error);
        }))
        .subscribe(() => {
          this.removeFile(index - removedCount);
          removedCount++;
        });
    });
  }
}
