import {FileManagerService} from '@erapulus/ui/file-manager';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {Injectable} from '@angular/core';
import {ErapulusDataAccessService} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'any'
})
export class UniversityFilesService extends FileManagerService {

  private universityId?: string;

  constructor () {
    super();
  }

  setUniversity (id: string): void {
    this.universityId = id;
  }

  deleteFile (id: string): string[] {
    return [];
  }

  getBaseRedirectUrl (): string[] {
    return [
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId ?? ''
    ];
  }

  getBaseRequestUrl (): string {
    return `${ErapulusDataAccessService.API_URL}/university/${this.universityId}/document`;
  }

  public getTableUrl (): string {
    return `/university/${this.universityId}/document`;
  }


}
