import {ObjectUtils} from '@erapulus/utils/helpers';

export class ErapulusHelpers {
  public static getErrors (response: string): string[] {
    if (ObjectUtils.isNotEmpty(response)) {
      const errors = response.split(';').map((error) => `common.erapulus.server.${error}`);
      if (errors.length > 1) {
        errors.shift();
      }
      return errors;
    } else {
      return ['common.erapulus.server.unknown.error'];
    }
  }
}
