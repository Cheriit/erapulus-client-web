import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderType, MessageService} from '@erapulus/ui/components';
import {LoginFormService} from './login-form.service';
import {FormGroup} from '@angular/forms';
import {TitleService} from '@erapulus/utils/title';

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
          type="password"
        ></ep-input>
        <ep-button
          class="float-right">
          Log in
        </ep-button>
      </form>
    </ep-container>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public headerType = HeaderType.H3;

  constructor (
    public loginFormService: LoginFormService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: TitleService) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('common.title.login');
    this.form = this.loginFormService.createForm();
  }

  submit (): void {
    this.loginFormService.submitForm();
    this.changeDetectorRef.detectChanges();
  }
}
