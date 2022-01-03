import {FileManagerService} from '@erapulus/ui/file-manager';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {Injectable} from '@angular/core';
import {ErapulusDataAccessService, ModuleDataAccessService} from '@erapulus/data-access/erapulus';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ModuleFilesService extends FileManagerService {

  private universityId?: string;
  private facultyId?: string;
  private programId?: string;
  private moduleId?: string;

  constructor (private readonly moduleDataAccessService: ModuleDataAccessService) {
    super();
  }

  setUniversity (id: string): void {
    this.universityId = id;
  }

  deleteFile (id: string): Observable<unknown> {
    return this.moduleDataAccessService.deleteDocument({
      universityId: this.universityId ?? '-1',
      documentId: id,
      id: this.moduleId ?? '-1',
      facultyId: this.facultyId ?? '-1',
      programId: this.programId ?? '-1'
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
      NavigationRoutes.MODULE,
      this.moduleId ?? '',
      NavigationRoutes.DOCUMENT
    ];
  }

  getBaseRequestUrl (): string {
    return `${ErapulusDataAccessService.API_URL}/university/${this.universityId}/faculty/${this.facultyId}/program/${this.programId}/module/${this.moduleId}/document`;
  }

  public getTableUrl (): string {
    return `university/${this.universityId}/faculty/${this.facultyId}/program/${this.programId}/module/${this.moduleId}/document`;
  }


  setParameters (universityId: string, facultyId: string, programId: string, id: string): void {
    this.universityId = universityId;
    this.facultyId = facultyId;
    this.programId = programId;
    this.moduleId = id;
  }
}
