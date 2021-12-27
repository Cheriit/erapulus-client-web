import {FileManagerService} from '@erapulus/ui/file-manager';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {Injectable} from '@angular/core';
import {ErapulusDataAccessService, ProgramDataAccessService} from '@erapulus/data-access/erapulus';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ProgramFilesService extends FileManagerService {

  private universityId?: string;
  private facultyId?: string;
  private programId?: string;

  constructor (private readonly programDataAccessService: ProgramDataAccessService) {
    super();
  }

  setUniversity (id: string): void {
    this.universityId = id;
  }

  deleteFile (id: string): Observable<unknown> {
    return this.programDataAccessService.deleteDocument({
      universityId: this.universityId ?? '-1',
      documentId: id,
      id: this.programId ?? '-1',
      facultyId: this.facultyId ?? '-1'
    });
  }

  getBaseRedirectUrl (): string[] {
    return [
      NavigationRoutes.ROOT,
      NavigationRoutes.UNIVERSITY,
      this.universityId ?? '',
      NavigationRoutes.FACULTY,
      this.facultyId ?? '',
      NavigationRoutes.PROGRAM,
      this.programId ?? '',
      NavigationRoutes.DOCUMENT
    ];
  }

  getBaseRequestUrl (): string {
    return `${ErapulusDataAccessService.API_URL}/university/${this.universityId}/faculty/${this.facultyId}/program/${this.programId}/document`;
  }

  public getTableUrl (): string {
    return `university/${this.universityId}/faculty/${this.facultyId}/program/${this.programId}/document`;
  }


  setParameters (universityId: string, facultyId: string, id: string): void {
    this.universityId = universityId;
    this.facultyId = facultyId;
    this.programId = id;
  }
}
