import {ObjectUtils} from './object-utils';

export class StringUtils {
  public static isEmpty (object: unknown): boolean {
    return ObjectUtils.isEmpty(object) || object === '';
  }

  public static isNotEmpty (object: unknown): boolean {
    return !StringUtils.isEmpty(object);
  }
}
