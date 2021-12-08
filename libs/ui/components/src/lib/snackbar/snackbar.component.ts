import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'snackbar',
  template: ` <p>snackbar works!</p> `,
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
}
