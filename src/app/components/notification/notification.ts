import { Component, inject } from '@angular/core';
import { NotificationService } from '@services/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);

  /* Signals */
  notification = this._notificationService.notification;

  onCloseNotification(): void {
    this._notificationService.closeNotification();
  }
}
