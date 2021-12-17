import {ErapulusResponse} from './erapulus-response.model';

export class ErapulusHelpers {
  public static getErrors<T> (response: ErapulusResponse<T>): string[] {
    if (response.message !== undefined) {
      return response.message.split(';');
    }
    return [];
  }
}
