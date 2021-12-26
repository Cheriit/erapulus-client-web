export abstract class FileManagerService {
  public abstract getBaseRequestUrl(): string;

  public abstract getBaseRedirectUrl(): string[];

  public abstract deleteFile(id: string): string[];

  public abstract getTableUrl(): string;
}
