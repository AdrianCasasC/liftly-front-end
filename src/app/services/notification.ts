import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = signal<Notification | null>(null);
  notification = this._notification.asReadonly();

  closeNotification(): void {
    this._notification.set(null);
  }

  createNotification(content: Notification) {
    this._notification.set(content);

    setTimeout(() => this.closeNotification(), 5000);
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
