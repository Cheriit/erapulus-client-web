import {Injectable} from '@angular/core';
import {AuthUser, UserRole} from '@erapulus/utils/auth';

@Injectable({
  providedIn: 'root'
})
export class UniversityPermissionsService {

  public static canList (user: AuthUser): boolean {
    return user.role === UserRole.ADMINISTRATOR;
  }

  public static canCreate (user: AuthUser): boolean {
    return user.role === UserRole.ADMINISTRATOR;
  }

  public static canSelect (user: AuthUser, universityId: string): boolean {
    switch (user.role) {
    case UserRole.UNIVERSITY_ADMINISTRATOR:
    case UserRole.EMPLOYEE:
      return user.universityId === universityId;
    default:
      return false;

    }
  }

  public static canDelete (user: AuthUser, universityId: string): boolean {
    switch (user.role) {
    case UserRole.ADMINISTRATOR:
      return true;
    case UserRole.UNIVERSITY_ADMINISTRATOR:
      return user.universityId === universityId;
    default:
      return false;
    }
  }

  public static canAccess (user: AuthUser, universityId: string): boolean {
    switch (user.role) {
    case UserRole.UNIVERSITY_ADMINISTRATOR:
    case UserRole.EMPLOYEE:
      return user.universityId.toString() === universityId;
    default:
      return false;
    }
  }
}
