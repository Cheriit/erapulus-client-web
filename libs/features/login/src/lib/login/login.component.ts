import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AnimationType} from '@erapulus/components';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'ep-login',
  template: `
    <ep-container>
      <ep-input [label]="'test'" [control]="tmpFormControl" [placeholder]="'test'"></ep-input>
      <ep-button>Click me!</ep-button>
    </ep-container>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public animationType: AnimationType = AnimationType.LOADING;
  public tmpFormControl: FormControl = new FormControl('', Validators.minLength(3));

  constructor () {
  }

  ngOnInit (): void {
  }
}
 
