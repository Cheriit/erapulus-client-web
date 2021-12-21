import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-not-found',
  template: `
    <ep-header>404 | {{'common.not-found.content' | translate}}</ep-header> `,
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  constructor (private titleService: TitleService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('common.title.not-found');
  }
}
