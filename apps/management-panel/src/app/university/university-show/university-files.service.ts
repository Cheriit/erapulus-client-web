import {FileManagerService} from '@erapulus/ui/file-manager';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {Injectable} from '@angular/core';
import {ErapulusDataAccessService, UniversityDataAccessService} from '@erapulus/data-access/erapulus';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class UniversityFilesService extends FileManagerService {

  private universityId?: string;

  constructor (private readonly universityDataAccessService: UniversityDataAccessService) {
    super();
  }

  setUniversity (id: string): void {
    this.universityId = id;
  }

  deleteFile (id: string): Observable<unknown> {
    return this.universityDataAccessService.deleteDocument({universityId: this.universityId ?? '-1', documentId: id});
  }

  getBaseRedirectUrl (): string[] {
    return [
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId ?? '',
      NavigationRoutes.DOCUMENT
    ];
  }

  getBaseRequestUrl (): string {
    return `${ErapulusDataAccessService.API_URL}/university/${this.universityId}/document`;
  }

  public getTableUrl (): string {
    return `/university/${this.universityId}/document`;
  }


}
