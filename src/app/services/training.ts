import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request';
import { Workout } from '@app/models/training';
import { environment } from 'environments/environment';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { NotificationService } from './notification';

@Injectable({
  providedIn: 'root',
})
export class Training extends RequestService {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);
  /*  Signals */
  private readonly _workout = signal<Workout | null>(null);
  private readonly _loadingMap = signal<Map<string, boolean>>(new Map());
  workout = this._workout.asReadonly()
  loadingMap = this._loadingMap.asReadonly()

  /* Variables */
  url = environment.apiUrl

  saveWorkout(workout: Workout): void {
    this._loadingMap.update(prev => prev.set('create', true))
    this.create<Workout>(this.url, workout).pipe(
      tap(resp => this._notificationService.createSuccess('Entrenamiento  guardado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo guardar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete('create');
        return prev;
      }))
    )
  }
}
