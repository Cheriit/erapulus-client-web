import {Injectable} from '@angular/core';
import {FilterElementType, TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder, Validators} from '@angular/forms';
import {UserRole} from '@erapulus/utils/auth';
import {ObjectUtils} from '@erapulus/utils/helpers';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UniversityDataAccessService, UserDataAccessService} from '@erapulus/data-access/erapulus';

export interface UserListParameters {
  type: UserRole,
  universityId?: string,
  name?: string,
  page: number
  pageSize: number,
  actions: TableAction[]
}

@Injectable({
  providedIn: 'any'
})
export class UserTableService {
  public reloadList$: Subject<void> = new Subject<void>();

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly userDataAccessService: UserDataAccessService,
    private readonly universityDataAccessService: UniversityDataAccessService) {
  }

  getListConfigurationObservable (parameters: UserListParameters, hasUniversity = false): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(parameters, hasUniversity));
  }

  getListConfiguration (parameters: UserListParameters, hasUniversity = false): TableConfiguration {
    return {
      filters: this.formBuilder.group({
        name: this.formBuilder.control(parameters.name ?? '', [Validators.maxLength(64)]),
        ...(hasUniversity ? {universityId: this.formBuilder.control(parameters.universityId ?? null)} : {})
      }),
      filterConfiguration: {
        name: {type: FilterElementType.TEXT},
        ...(hasUniversity ? {
          universityId: {
            type: FilterElementType.SELECT,
            accessor: this.universityDataAccessService
          }
        } : {})
      },
      hasPagination: true,
      actions: parameters.actions,
      columns: [
        {key: 'firstName', widthPercentage: 30},
        {key: 'lastName', widthPercentage: 30},
        {key: 'email', widthPercentage: 40}
      ],
      url: 'user',
      prefix: 'management-panel.user-list.table.',
      currentPage: parameters.page,
      pageSize: parameters.pageSize,
      parameters: {
        'type': parameters.type,
        ...(ObjectUtils.isNotEmpty(parameters.universityId) ? {'university': parameters.universityId?.toString()} : {})
      }
    };
  }

  handleTableEvent (event: TableActionEvent, role: UserRole): void {
    switch (event.type) {
    case TableAction.NEW:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.USER,
        NavigationRoutes.CREATE,
        role.toLowerCase()
      ]).then();
      break;
    case TableAction.EDIT:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.USER,
        event.content,
        NavigationRoutes.EDIT
      ]).then();
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.user.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.user.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(
        take(1),
        switchMap((action) => {
          if (action === MessageAction.ACCEPT) {
            return this.userDataAccessService.deleteUser({id: event.content});
          }
          return of(false);
        }
        ),
        switchMap((x) => {
          if (typeof x === 'boolean') {
            return of(x);
          }
          return of(true);
        })).subscribe((reload) => {
        if (reload) {
          this.reloadList$.next();
        }
      });
      break;
    case TableAction.SELECT:
    default:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.USER,
        event.content
      ], {preserveFragment: false}).then();
      break;

    }
  }
}
