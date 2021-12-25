import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {StringUtils} from '@erapulus/utils/helpers';

export class CustomValidators {
  private static PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  private static PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$&*\-_])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  private static URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;


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

  public static url (): ValidatorFn {
    return (urlControl: AbstractControl): ValidationErrors | null => {
      const {value} = urlControl;
      console.log(value);
      if (StringUtils.isNotEmpty(value)) {
        if (!this.URL_REGEX.test(value)) {
          return {validUrl: false};
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
