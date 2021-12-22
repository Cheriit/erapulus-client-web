import {Injectable} from '@angular/core';
import {TableAction, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder, Validators} from '@angular/forms';
import {UserRole} from '@erapulus/utils/auth';
import {ObjectUtils} from '@erapulus/utils/helpers';
import {BehaviorSubject, Subject} from 'rxjs';

export interface UserListParameters {
  type: UserRole,
  universityId?: number,
  name?: string,
  page: number
  pageSize: number
}

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  constructor (private readonly formBuilder: FormBuilder) {
  }

  getListConfigurationObservable (parameters: UserListParameters): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(parameters));
  }

  getListConfiguration (parameters: UserListParameters): TableConfiguration {
    return {
      filters: this.formBuilder.group({
        name: this.formBuilder.control(parameters.name ?? '', [Validators.maxLength(64)])
      }),
      actions: [
        TableAction.EDIT,
        TableAction.DELETE
      ],
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
}
