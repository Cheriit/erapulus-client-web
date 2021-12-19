import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ep-container',
  template: `
    <section
      class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-auto rounded-lg border-gray-300 border relative">
      <ng-content></ng-content>
      <div class="mask" *ngIf="loading">
        <div>
          <ep-spinner></ep-spinner>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  @Input() loading: boolean | null = false;
}
