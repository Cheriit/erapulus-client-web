import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TitleService} from '@erapulus/utils/title';

@Component({
  selector: 'ep-not-found',
  template: `
    <div class="w-full h-full flex place-content-center p-10">
      <ep-header>404 | {{'not-found.content' | translate}}</ep-header>
    </div>
  `,
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  constructor (private titleService: TitleService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('not-found.title');
  }
}
