import {Injectable} from '@angular/core';
import {FilterElementType, TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {FacultyDataAccessService} from '@erapulus/data-access/erapulus';

export interface FacultyListParameters {
  universityId?: string,
  name?: string,
  page: number
  pageSize: number
}

@Injectable({
  providedIn: 'any'
})
export class FacultyListService {
  public reloadList$: Subject<void> = new Subject<void>();
  private universityId?: string;

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly facultyDataAccessService: FacultyDataAccessService) {
  }

  getListConfigurationObservable (parameters: FacultyListParameters): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(parameters));
  }

  getListConfiguration (parameters: FacultyListParameters): TableConfiguration {
    this.universityId = parameters.universityId;
    return {
      filters: this.formBuilder.group({
        name: this.formBuilder.control(parameters.name ?? '', [Validators.maxLength(64)])
      }),
      filterConfiguration: {
        name: {type: FilterElementType.TEXT}
      },
      hasPagination: true,
      currentPage: parameters.page,
      pageSize: parameters.pageSize,
      actions: [
        TableAction.NEW,
        TableAction.EDIT,
        TableAction.SELECT,
        TableAction.DELETE
      ],
      columns: [{key: 'name', widthPercentage: 100}],
      url: `university/${parameters.universityId}/faculty`,
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
        NavigationRoutes.FACULTY,
        NavigationRoutes.CREATE
      ]).then();
      break;
    case TableAction.EDIT:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.FACULTY,
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
            return this.facultyDataAccessService.deleteFaculty({
              universityId: this.universityId ?? '-1',
              facultyId: event.content
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
        NavigationRoutes.FACULTY,
        event.content
      ], {preserveFragment: false}).then();
      break;
    }
  }
}
