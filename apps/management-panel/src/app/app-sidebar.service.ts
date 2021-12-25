import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthFacade, UserRole} from '@erapulus/utils/auth';
import {registerSidebarItems, SidebarItem, SidebarService} from '@erapulus/ui/sidebar-layout';
import {NavigationRoutes} from '@erapulus/utils/navigation';

@Injectable({
  providedIn: 'any'
})
export class AppSidebarService extends SidebarService {
  private readonly sidebarItems: { [key: string]: SidebarItem } = {
    'users': {
      title: 'management-panel.sidebar.users',
      path: [
        NavigationRoutes.ROOT,
        NavigationRoutes.USER
      ],
      iconPath: '/assets/icons/user.svg',
      enabled: false
    },
    'universities': {
      title: 'management-panel.sidebar.universities',
      path: [
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY
      ],
      iconPath: '/assets/icons/university.svg',
      enabled: false
    },
    'faculties': {
      title: 'management-panel.sidebar.faculty',
      path: [NavigationRoutes.ROOT],
      iconPath: 'assets/icons/faculty.svg',
      enabled: false
    },
    'buildings': {
      title: 'management-panel.sidebar.building',
      path: [NavigationRoutes.ROOT],
      iconPath: 'assets/icons/building.svg',
      enabled: false
    },
    'posts': {
      title: 'management-panel.sidebar.post',
      path: [NavigationRoutes.ROOT],
      iconPath: 'assets/icons/post.svg',
      enabled: false
    }
  };

  constructor (
    private readonly store: Store,
    private readonly authFacade: AuthFacade
  ) {
    super();
  }

  public getFacultyPath (universityId: string): string[] {
    return [
      NavigationRoutes.UNIVERSITY,
      universityId,
      NavigationRoutes.FACULTY
    ];
  }

  public getBuildingPath (universityId: string): string[] {
    return [
      NavigationRoutes.UNIVERSITY,
      universityId,
      NavigationRoutes.BUILDING
    ];
  }

  public getPostPath (universityId: string): string[] {
    return [
      NavigationRoutes.UNIVERSITY,
      universityId,
      NavigationRoutes.POST
    ];
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
        items.push({...this.sidebarItems['faculties'], path: this.getFacultyPath(user?.universityId ?? '-1')});
        items.push({...this.sidebarItems['buildings'], path: this.getBuildingPath(user?.universityId ?? '-1')});
        items.push({...this.sidebarItems['posts'], path: this.getPostPath(user?.universityId ?? '-1')});
      }
      this.store.dispatch(registerSidebarItems({items}));
    });
  }

}
