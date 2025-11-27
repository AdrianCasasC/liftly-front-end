import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = signal<Notification | null>(null);
  private _showNotification = signal<boolean>(false);
  notification = this._notification.asReadonly();
  showNotification = this._showNotification.asReadonly();

  closeNotification(): void {
    this._showNotification.set(false);
  }

  createNotification(content: Notification) {
    this._notification.set(content);
    this._showNotification.set(true);
    setTimeout(() => this.closeNotification(), 3000);
  }

  createSuccess(message: string): void {
    this.createNotification({
      icon: 'success',
      type: 'success',
      message: message
    })
  }

  createError(message: string): void {
    this.createNotification({
      icon: 'error',
      type: 'error',
      message: message
    })
  }
}

export interface Notification {
  type: 'success' | 'error';
  message: string;
  icon: string;
}
