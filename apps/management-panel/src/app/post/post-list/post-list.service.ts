import {Injectable} from '@angular/core';
import {FilterElementType, TableAction, TableActionEvent, TableConfiguration} from '@erapulus/ui/table';
import {FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import {MessageAction, MessageService, MessageType} from '@erapulus/ui/message';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@erapulus/utils/navigation';
import {CustomValidators} from '@erapulus/utils/forms';
import {PostDataAccessService} from '@erapulus/data-access/erapulus';

export interface PostListParameters {
  universityId?: string,
  title?: string,
  page: number,
  pageSize: number,
  dateFrom: number,
  dateTo: number
}

@Injectable({
  providedIn: 'any'
})
export class PostListService {
  public reloadList$: Subject<void> = new Subject<void>();
  private universityId?: string;

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly postDataAccessService: PostDataAccessService) {
  }

  getListConfigurationObservable (parameters: PostListParameters): Subject<TableConfiguration> {
    return new BehaviorSubject(this.getListConfiguration(parameters));
  }

  getListConfiguration (parameters: PostListParameters): TableConfiguration {
    this.universityId = parameters.universityId;
    return {
      filters: this.formBuilder.group({
        title: this.formBuilder.control(parameters.title ?? '', [Validators.maxLength(64)]),
        from: this.formBuilder.control(parameters.dateFrom ?? '', [
          Validators.maxLength(64),
          CustomValidators.date()
        ]),
        to: this.formBuilder.control(parameters.dateFrom ?? '', [
          Validators.maxLength(64),
          CustomValidators.dateBefore('from'),
          CustomValidators.date()
        ])
      }),
      filterConfiguration: {
        title: {type: FilterElementType.TEXT},
        from: {type: FilterElementType.DATE},
        to: {type: FilterElementType.DATE}
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
      columns: [
        {key: 'title', widthPercentage: 60},
        {key: 'date', widthPercentage: 40}
      ],
      url: `university/${parameters.universityId}/post`,
      prefix: 'management-panel.post.list.',
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
        NavigationRoutes.POST,
        NavigationRoutes.CREATE
      ]).then();
      break;
    case TableAction.EDIT:
      this.router.navigate([
        NavigationRoutes.ROOT,
        NavigationRoutes.UNIVERSITY,
        this.universityId,
        NavigationRoutes.POST,
        event.content,
        NavigationRoutes.EDIT
      ]).then();
      break;
    case TableAction.DELETE:
      this.messageService.generateMessage({
        title: 'management-panel.post.delete.title',
        type: MessageType.WARNING,
        content: 'management-panel.post.delete.content',
        hasButtons: true,
        hasClose: false
      }).instance.action.pipe(
        take(1),
        switchMap((action) => {
          if (action === MessageAction.ACCEPT) {
            return this.postDataAccessService.deletePost({
              universityId: this.universityId ?? '-1',
              postId: event.content
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
        NavigationRoutes.POST,
        event.content
      ], {preserveFragment: false}).then();
      break;
    }
  }
}
