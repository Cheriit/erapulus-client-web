import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ep-container',
  template: `
    <section
      class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-auto sm:rounded-lg border-gray-300 border relative">
      <ng-content></ng-content>
      <div class="w-full h-full absolute top-0 left-0 flex items-center justify-center" *ngIf="loading">
        <div>
          <ep-spinner></ep-spinner>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  @Input() loading = true;
}
