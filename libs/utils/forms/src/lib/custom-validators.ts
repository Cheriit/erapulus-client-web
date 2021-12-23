import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {StringUtils} from '@erapulus/utils/helpers';

export class CustomValidators {
  private static PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  private static PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$&*\-_])(?=.*[0-9])(?=.*[a-z]).{8,}$/;


  public static phone (): ValidatorFn {
    return (phoneControl: AbstractControl): ValidationErrors | null => {
      const {value} = phoneControl;
      if (StringUtils.isNotEmpty(value)) {
        if (!this.PHONE_REGEX.test(value)) {
          return {validPhoneNumber: false};
        }
      }
      return null;
    };
  }

  public static password (): ValidatorFn {
    return (passwordControl: AbstractControl): ValidationErrors | null => {
      const {value} = passwordControl;
      if (StringUtils.isNotEmpty(value)) {
        if (!this.PASSWORD_REGEX.test(value)) {
          return {validPassword: false};
        }
      }
      return null;
    };
  }

  public static passwordConfirm (passwordFieldName: string): ValidatorFn {
    return (passwordControl: AbstractControl): ValidationErrors | null => {
      return !!passwordControl.parent &&
      !!passwordControl.parent.value &&
      passwordControl.value === passwordControl.parent.value[passwordFieldName] ? null : {passwordConfirm: false};
    };
  }

}
