import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingMap = signal<Map<string, boolean>>(new Map());
  loadingMap = this._loadingMap.asReadonly();
  
  setLoading(key: string, value: boolean): void {
    this._loadingMap.update(prev => prev.set(key, value));
  }

  removeLoading(key: string): void {
    this._loadingMap.update(prev => {
      prev.delete(key);
      return prev;
    })
  }
}
