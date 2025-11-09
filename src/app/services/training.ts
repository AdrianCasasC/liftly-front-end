import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request';
import { Workout } from '@app/models/training';
import { environment } from 'environments/environment';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification';

@Injectable({
  providedIn: 'root',
})
export class TrainingService extends RequestService {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);
  /*  Signals */
  private readonly _workout = signal<Workout | null>(null);
  private readonly _allWorkouts = signal<Workout[]>([]);
  private readonly _loadingMap = signal<Map<string, boolean>>(new Map());
  workout = this._workout.asReadonly()
  allWorkouts = this._allWorkouts.asReadonly()
  loadingMap = this._loadingMap.asReadonly()

  /* Variables */
  url = environment.apiUrl

  getAllWorkouts(params: Record<string, any>): Observable<Workout[]> {
    const mapKey = 'getAll';
    this._loadingMap.update(prev => prev.set(mapKey, true));
    return this.getAll<Workout>(this.url, params).pipe(
      tap((res) => this._allWorkouts.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener los entrenamientos ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete(mapKey);
        return prev;
      }))
    )
  }

  getWorkout(id: string): Observable<Workout> {
    const mapKey = 'getById';
    this._loadingMap.update(prev => prev.set(mapKey, true));
    return this.getById<Workout>(id, this.url).pipe(
      tap(res => this._workout.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete(mapKey);
        return prev;
      }))
    )
  }

  createWorkout(workout: Workout): void {
    const mapKey = 'create';
    this._loadingMap.update(prev => prev.set(mapKey, true));
    this.create<Workout>(this.url, workout).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  creado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo crear el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete(mapKey);
        return prev;
      }))
    ).subscribe();
  }

  updateWorkout(workout: Workout, id: string): void {
    const mapKey = 'update';
    this._loadingMap.update(prev => prev.set(mapKey, true))
    this.update<Workout>(this.url, workout, id).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  guardado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo guardar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete(mapKey);
        return prev;
      }))
    ).subscribe();
  }

  deleteWorkout(id: string): void {
    const mapKey = 'delete';
    this.delete(id, this.url).pipe(
      tap(() => this._notificationService.createSuccess('¡Entrenamiento  eliminado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo eliminar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingMap.update(prev => {
        prev.delete(mapKey);
        return prev;
      }))
    ).subscribe();
  }
}
