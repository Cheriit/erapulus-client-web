import {Injectable} from '@angular/core';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder, Validators} from '@angular/forms';
import {UserRole} from '@erapulus/utils/auth';
import {ObjectUtils} from '@erapulus/utils/helpers';
import {BehaviorSubject, Subject, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';

export interface UserListParameters {
  type: UserRole,
  universityId?: number,
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

  constructor (private readonly formBuilder: FormBuilder, private messageService: MessageService) {
  }

  getListConfigurationObservable (parameters: UserListParameters): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(parameters));
  }

  getListConfiguration (parameters: UserListParameters): TableConfiguration {
    return {
      filters: this.formBuilder.group({
        name: this.formBuilder.control(parameters.name ?? '', [Validators.maxLength(64)])
      }),
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

  handleTableEvent (event: TableActionEvent): void {
    switch (event.type) {
    case TableAction.NEW:
      break;
    case TableAction.EDIT:
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.user.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.user.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(take(1)).subscribe((action) => {
        if (action === MessageAction.ACCEPT) {
          this.reloadList$.next();
        }
      });
      break;
    case TableAction.SELECT:
    default:
      break;

    }
  }
}
