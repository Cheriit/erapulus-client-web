import {Injectable} from '@angular/core';
import {TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder} from '@angular/forms';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {BuildingDataAccessService} from '@erapulus/data-access/erapulus';

export interface BuildingListParameters {
  universityId?: string,
  name?: string
}

@Injectable({
  providedIn: 'any'
})
export class BuildingListService {
  public reloadList$: Subject<void> = new Subject<void>();
  private universityId?: string;

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly buildingDataAccessService: BuildingDataAccessService) {
  }

  getListConfigurationObservable (universityId: string): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(universityId));
  }

  getListConfiguration (universityId: string): TableConfiguration {
    this.universityId = universityId;
    return {
      filters: this.formBuilder.group({}),
      filterConfiguration: {},
      hasPagination: false,
      actions: [
        TableAction.NEW,
        TableAction.EDIT,
        TableAction.SELECT,
        TableAction.DELETE
      ],
      columns: [{key: 'name', widthPercentage: 100}],
      url: `university/${universityId}/building`,
      prefix: 'management-panel.faculty-list.table.',
      parameters: {}
    };
  }

  handleTableEvent (event: TableActionEvent): void {
    switch (event.type) {
    case TableAction.NEW:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.BUILDING,
        NavigationRoutes.CREATE
      ]).then();
      break;
    case TableAction.EDIT:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.BUILDING,
        event.content,
        NavigationRoutes.EDIT
      ]).then();
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.faculty.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.faculty.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(
        take(1),
        switchMap((action) => {
          if (action === MessageAction.ACCEPT) {
            return this.buildingDataAccessService.deleteBuilding({
              universityId: this.universityId ?? '-1',
              buildingId: event.content
            });
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
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.BUILDING,
        event.content
      ], {preserveFragment: false}).then();
      break;
    }
  }
}
