import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';

@Injectable({
  providedIn: 'root'
})
export class UniversityGuard
implements CanActivate {
  private static readonly ROLE_CAN_ACTIVATE: UserRole[] = [
    UserRole.UNIVERSITY_ADMINISTRATOR,
    UserRole.EMPLOYEE
  ];

  constructor (private authFacade: AuthFacade, private router: Router) {
  }

  canActivate (route: ActivatedRouteSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.authUser$.pipe(
      map((user) => {
        const universityId = route.paramMap.get('university_id');
        if (user && universityId && UniversityGuard.ROLE_CAN_ACTIVATE.includes(user.role) && user.universityId.toString() === universityId) {
          return true;
        }
        return this.router.createUrlTree([
          NavigationRoutes.ROOT,
          NavigationRoutes.WELCOME
        ]);
      }));
  }
}
