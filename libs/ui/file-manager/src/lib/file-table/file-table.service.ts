import {Inject, Injectable} from '@angular/core';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder} from '@angular/forms';
import {FileManagerService} from '../file-manager.service';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'any'
})
export class FileTableService {
  public reloadList$: Subject<void> = new Subject<void>();

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    @Inject('MANAGER_SERVICE') private readonly fileManagerService: FileManagerService) {
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
        TableAction.EDIT,
        TableAction.SELECT,
        TableAction.DELETE
      ],
      columns: [{key: 'name', widthPercentage: 100}],
      url: this.fileManagerService.getBaseRequestUrl(),
      prefix: 'common.file-list.table.',
      parameters: {}
    };
  }

  handleTableEvent (event: TableActionEvent): void {
    switch (event.type) {
    case TableAction.EDIT:
      this.router.navigate([
        ...this.fileManagerService.getBaseRedirectUrl(),
        event.content,
        NavigationRoutes.EDIT
      ]).then();
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'common.file.delete.title',
        type: MessageType.WARNING,
        content: 'common.file.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(
        take(1),
        switchMap((action) => {
          if (action === MessageAction.ACCEPT) {
            return this.fileManagerService.deleteFile(event.content);
          }
          return of(false);
        }
        )).subscribe((reload) => {
        if (reload) {
          this.reloadList$.next();
        }
      });
      break;
    case TableAction.SELECT:
    default:
      window.open(`${this.fileManagerService.getBaseFileUrl()}/${event.content}`, '_blank');
      break;
    }
  }

}
