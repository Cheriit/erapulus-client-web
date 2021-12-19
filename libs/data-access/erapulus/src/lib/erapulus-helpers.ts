export class ErapulusHelpers {
  public static getErrors (response: string): string[] {
    const errors = response.split(';').map((error) => `common.erapulus.server.${error}`);
    if (errors.length > 1) {
      errors.shift();
    }
    return errors;
  }
}
