export abstract class FileManagerService {
  public abstract getBaseFileUrl(): string;

  public abstract getBaseRequestUrl(): string;

  public abstract getBaseRedirectUrl(): string[];

  public abstract deleteFile(id: string): string[];
}
