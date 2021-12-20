import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthFacade} from '../+state/auth.facade';
import {StringUtils} from '@erapulus/utils/helpers';
import {TitleService} from '@erapulus/utils/title';
import {NavigationRoutes} from '@erapulus/utils/navigation';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserGuard
implements CanActivate {
  constructor (private authFacade: AuthFacade, private router: Router, private titleService: TitleService) {
  }

  canActivate ():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.token$.pipe(
      map((token) => {
        if (StringUtils.isEmpty(token)) {
          this.titleService.setTitle('common.title.login');
          return this.router.createUrlTree([
            NavigationRoutes.ROOT,
            NavigationRoutes.LOGIN
          ]);
        }
        return true;
      }));
  }
}
