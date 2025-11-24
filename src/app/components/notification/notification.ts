import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NotificationService } from '@services/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'liftly-notification',
  standalone: true,
  imports: [NzIconModule, NgClass],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  /* Inputs */
  theme = input<'dark' | 'light'>('dark');

  /* Signals */
  notification = this._notificationService.notification;

  onCloseNotification(): void {
    this._notificationService.closeNotification();
  }
}
