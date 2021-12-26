import {Observable} from 'rxjs';

export abstract class FileManagerService {
  public abstract getBaseRequestUrl(): string;

  public abstract getBaseRedirectUrl(): string[];

  public abstract deleteFile(id: string): Observable<unknown>;

  public abstract getTableUrl(): string;
}
