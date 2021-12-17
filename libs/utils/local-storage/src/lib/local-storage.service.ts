export class LocalStorageService {
  get (name: string): string {
    const value = localStorage.getItem(name);
    return value ?? '';
  }
}
