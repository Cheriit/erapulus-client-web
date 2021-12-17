import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-container',
  template: `
    <section class="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-auto sm:rounded-lg border-gray-300 border">
      <ng-content></ng-content>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
}
