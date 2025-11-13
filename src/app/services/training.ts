import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request';
import { Exercise, Workout } from '@app/models/training';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService extends RequestService {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);
  private readonly _loadingService = inject(LoadingService);
  /*  Signals */
  private readonly _workout = signal<Workout | null>(null);
  private readonly _allWorkouts = signal<Workout[]>([]);
  
  workout = this._workout.asReadonly()
  allWorkouts = this._allWorkouts.asReadonly()

  /* Variables */
  private readonly _url = '/workouts';

  getAllWorkouts(params?: Record<string, any>): Observable<Workout[]> {
    const mapKey = 'getAll';
    this._loadingService.setLoading(mapKey, true);
    return this.getAll<Workout>(this._url, params).pipe(
      tap((res) => this._allWorkouts.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener los entrenamientos ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    )
  }

  getWorkout(id: string): Observable<Workout> {
    const mapKey = 'getById';
    this._loadingService.setLoading(mapKey, true);
    return this.getById<Workout>(id, this._url).pipe(
      tap(res => this._workout.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    )
  }

  createWorkout(workout: Workout): void {
    const mapKey = 'create';
    this._loadingService.setLoading(mapKey, true);
    this.create<Workout>(this._url, workout).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  creado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo crear el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    ).subscribe();
  }

  updateWorkout(workout: Workout, id: string): void {
    const mapKey = 'update';
    this._loadingService.setLoading(mapKey, true);
    this.update<Workout>(this._url, workout, id).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  guardado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo guardar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    ).subscribe();
  }

  deleteWorkout(id: string): void {
    const mapKey = 'delete';
    this._loadingService.setLoading(mapKey, true);
    this.delete(id, this._url).pipe(
      tap(() => this._notificationService.createSuccess('¡Entrenamiento  eliminado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo eliminar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    ).subscribe();
  }
}
