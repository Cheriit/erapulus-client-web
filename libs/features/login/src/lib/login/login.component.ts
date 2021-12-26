import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderType} from '@erapulus/ui/components';
import {LoginFormService} from './login-form.service';
import {FormGroup} from '@angular/forms';
import {TitleService} from '@erapulus/utils/title';
import {BehaviorSubject} from 'rxjs';
import {ObjectUtils, StringUtils} from '@erapulus/utils/helpers';
import {HttpStatusCode} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthActions, AuthFacade} from '@erapulus/utils/auth';
import {NavigationService} from '@erapulus/utils/navigation';
import {MessageService} from '@erapulus/ui/message';
import {LoginResponseParams} from '@erapulus/data-access/erapulus';

@Component({
  selector: 'ep-login',
  template: `
    <ep-container class="container" [loading]="loading | async">
      <ep-header [headerType]="headerType">{{'common.login.welcome' | translate}}</ep-header>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <ep-input
          [label]="'common.login.email.label' | translate"
          [placeholder]="'common.login.email.placeholder' | translate"
          [control]="loginFormService.getControl('email')"
          type="email"
        ></ep-input>
        <ep-input
          [label]="'common.login.password.label' | translate"
          [placeholder]="'common.login.email.placeholder' | translate"
          [control]="loginFormService.getControl('password')"
          type="password"
        ></ep-input>
        <ep-button
          class="float-right">
          Log in
          <img alt="Sing in" src="/assets/icons/forward.svg" class="pl-2 fill-white h-4 pt-[2px]"/>
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
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor (
    public loginFormService: LoginFormService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: TitleService,
    private store: Store,
    private navigationService: NavigationService,
    private authFacade: AuthFacade) {
  }

  ngOnInit (): void {
    this.titleService.setTitle('common.title.login');
    this.form = this.loginFormService.createForm();
    this.authFacade.token$.subscribe((value) => {
      if (StringUtils.isNotEmpty(value)) {
        this.navigationService.back();
      }
    });
  }

  submit (): void {
    const request = this.loginFormService.submitForm();
    if (ObjectUtils.isNotEmpty(request)) {
      this.loading.next(true);
      request?.subscribe((response) => {
        this.loading.next(false);
        if (response.status === HttpStatusCode.Ok && response.payload) {
          this.store.dispatch(AuthActions.signIn({authData: response.payload as LoginResponseParams}));
        }
      });
    }
    this.changeDetectorRef.detectChanges();
  }
}
