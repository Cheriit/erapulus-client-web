import {Injectable} from '@angular/core';
import {UserRole} from '@erapulus/utils/auth';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  public static readonly ADMINISTRATOR_ACCESS: UserRole[] = [
    UserRole.ADMINISTRATOR,
    UserRole.UNIVERSITY_ADMINISTRATOR,
    UserRole.STUDENT
  ];
  public static readonly UNIVERSITY_ADMINISTRATOR_ACCESS: UserRole[] = [
    UserRole.UNIVERSITY_ADMINISTRATOR,
    UserRole.EMPLOYEE
  ];

  public static canAccess (userRole: UserRole, targetRole: UserRole): boolean {
    switch (userRole) {
    case UserRole.ADMINISTRATOR:
      return UserAccessService.ADMINISTRATOR_ACCESS.includes(targetRole);
    case UserRole.UNIVERSITY_ADMINISTRATOR:
      return UserAccessService.UNIVERSITY_ADMINISTRATOR_ACCESS.includes(targetRole);
    default:
      return false;

    }
  }
}
