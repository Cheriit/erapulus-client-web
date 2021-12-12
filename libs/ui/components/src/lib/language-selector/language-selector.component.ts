import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-language-selector',
  template: ` <p>language-selector works!</p> `,
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
}
