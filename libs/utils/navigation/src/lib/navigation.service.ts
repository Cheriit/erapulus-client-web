import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NavigationRoutes} from './navigation-routes';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];

  constructor (private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.history.length === 0) {
          this.history.push(event.urlAfterRedirects);

        } else if (this.history[this.history.length - 1] !== event.urlAfterRedirects) {
          this.history.push(event.urlAfterRedirects);
        }
      }
    });
  }

  public getHistory ():
    string[] {
    return this.history;
  }

  public back (number = 1): void {
    this.history.splice(-1, number);
    if (this.history.length > 0
    ) {
      this.router.navigateByUrl(this.history[this.history.length - 1]).then();
    } else {
      this.router.navigateByUrl(NavigationRoutes.ROOT).then();
    }
  }

  public redirectToLogin (): Promise<boolean> {
    return this.router.navigate([
      NavigationRoutes.ROOT,
      NavigationRoutes.LOGIN
    ]);
  }

}
