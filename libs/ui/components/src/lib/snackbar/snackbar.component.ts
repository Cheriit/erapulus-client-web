import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ep-snackbar',
  template: ' <p>snackbar works!</p> ',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent {
}
