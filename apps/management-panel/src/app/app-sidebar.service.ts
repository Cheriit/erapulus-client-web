import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {registerSidebarItems, SidebarItem} from '@erapulus/ui/sidebar-layout';
import {NavigationRoutes} from '@erapulus/utils/navigation';

@Injectable({
  providedIn: 'root'
})
export class AppSidebarService {
  private readonly sidebarItems: { [key: string]: SidebarItem } = {
    'users': {
      title: 'management-panel.sidebar.users',
      path: NavigationRoutes.USERS,
      iconPath: '/assets/icons/user.svg',
      enabled: false
    },
    'universities': {
      title: 'management-panel.sidebar.universities',
      path: NavigationRoutes.UNIVERSITIES,
      iconPath: '/assets/icons/university.svg',
      enabled: false
    },
    'courses': {
      title: 'management-panel.sidebar.courses',
      path: NavigationRoutes.COURSES,
      iconPath: 'assets/icons/course.svg',
      enabled: false
    }
  };

  constructor (
    private readonly store: Store,
    private readonly authFacade: AuthFacade
  ) {
  }

  public calculatePermissions (): void {
    this.authFacade.authUser$.subscribe((user) => {
      const items: SidebarItem[] = [];
      if (user?.role === UserRole.ADMINISTRATOR) {
        items.push(this.sidebarItems['users']);
        items.push(this.sidebarItems['universities']);
      } else {
        if (user?.role === UserRole.UNIVERSITY_ADMINISTRATOR) {
          items.push(this.sidebarItems['users']);
        }
        items.push(this.sidebarItems['universities']);
        items.push(this.sidebarItems['courses']);
      }
      this.store.dispatch(registerSidebarItems({items}));
    });
  }

}
