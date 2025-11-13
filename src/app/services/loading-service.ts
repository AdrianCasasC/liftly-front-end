import { Injectable, signal } from '@angular/core';
import { LoadingKeys } from '@app/models/common';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingMap = signal<Map<LoadingKeys, boolean>>(new Map());
  loadingMap = this._loadingMap.asReadonly();
  
  setLoading(key: LoadingKeys, value: boolean): void {
    this._loadingMap.update(prev => prev.set(key, value));
  }

  removeLoading(key: LoadingKeys): void {
    this._loadingMap.update(prev => {
      prev.delete(key);
      return prev;
    })
  }
}
