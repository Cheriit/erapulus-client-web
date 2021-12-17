import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AnimationType, HeaderType, MessageService} from '@erapulus/ui/components';
import {LoginFormService} from './login-form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ep-login',
  template: `
    <ng-template epMessage></ng-template>
    <ep-container class="container">
      <ep-header [headerType]="headerType">{{'common.login.welcome' | translate}}</ep-header>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <ep-input
          [label]="'common.login.email.label' | translate"
          [control]="loginFormService.getControl('email')"
          [placeholder]="'common.login.email.placeholder' | translate"
        ></ep-input>
        <ep-input
          [label]="'common.login.password.label' | translate"
          [control]="loginFormService.getControl('password')"
          [placeholder]="'common.login.email.placeholder' | translate"
        ></ep-input>
        <ep-button
          class="float-right"
          [disabled]="
            form.disabled || form.pending || form.errors !== null
          "
          [animationType]="form.pending ? loading : undefined"
        >Log in
        </ep-button>
      </form>
    </ep-container>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public loading: AnimationType = AnimationType.LOADING;
  public headerType = HeaderType.H3;

  constructor (public loginFormService: LoginFormService, private messageService: MessageService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit (): void {
    this.form = this.loginFormService.createForm();
  }

  submit (): void {
    this.loginFormService.submitForm();
    this.changeDetectorRef.markForCheck();
  }
}
