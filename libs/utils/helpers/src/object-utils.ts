export class ObjectUtils {
  public static isEmpty (object: unknown): boolean {
    return object === null || object === undefined;
  }

  public static isNotEmpty (object: unknown): boolean {
    return !ObjectUtils.isEmpty(object);
  }
}
