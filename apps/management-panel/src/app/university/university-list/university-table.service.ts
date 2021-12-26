import {Injectable} from '@angular/core';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder} from '@angular/forms';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {UniversityDataAccessService} from '@erapulus/data-access/erapulus';

export interface UniversityListParameters {
  name?: string,
  page: number
  pageSize: number
}

@Injectable({
  providedIn: 'any'
})
export class UniversityTableService {
  public reloadList$: Subject<void> = new Subject<void>();

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly universityDataAccessService: UniversityDataAccessService) {
  }

  getListConfigurationObservable (): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration());
  }

  getListConfiguration (): TableConfiguration {
    return {
      filters: this.formBuilder.group({}),
      filterConfiguration: {},
      hasPagination: false,
      actions: [
        TableAction.NEW,
        TableAction.DELETE
      ],
      columns: [{key: 'name', widthPercentage: 100}],
      url: 'university',
      prefix: 'management-panel.university-list.table.',
      parameters: {}
    };
  }

  handleTableEvent (event: TableActionEvent): void {
    switch (event.type) {
    case TableAction.NEW:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        NavigationRoutes.CREATE
      ]).then();
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.university.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.university.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(
        take(1),
        switchMap((action) => {
          if (action === MessageAction.ACCEPT) {
            return this.universityDataAccessService.deleteUniversity({id: event.content});
          }
          return of(false);
        }
        )).subscribe((reload) => {
        if (reload) {
          this.reloadList$.next();
        }
      });
      break;
    default:
      break;

    }
  }
}
