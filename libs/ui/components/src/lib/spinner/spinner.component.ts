import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-spinner',
  template: `
    <div class="w-14 h-14 spinner">
      <img alt="Spinner" src="/assets/icons/spinner.png" class="w-full h-full"/>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
}
