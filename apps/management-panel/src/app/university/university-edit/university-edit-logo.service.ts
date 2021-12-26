import {FileManagerService} from '@erapulus/ui/file-manager';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {ErapulusDataAccessService} from '@erapulus/data-access/erapulus';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class UniversityEditLogoService extends FileManagerService {

  private universityId?: string;

  constructor () {
    super();
  }

  setUniversity (id: string): void {
    this.universityId = id;
  }

  deleteFile (id: string): Observable<unknown> {
    return of();
  }

  getBaseRedirectUrl (): string[] {
    return [
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId ?? ''
    ];
  }

  getBaseRequestUrl (): string {
    return `${ErapulusDataAccessService.API_URL}/university/${this.universityId}/logo`;
  }

  getTableUrl (): string {
    return '';
  }

}
