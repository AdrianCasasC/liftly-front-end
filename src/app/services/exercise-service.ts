import { inject, Injectable } from '@angular/core';
import { RequestService } from './request';
import { ClosestExercise, Exercise, CollectionExercise } from '@app/models/training';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification';
import { LoadingService } from './loading-service';
import { LOADING_KEYS } from '@app/constants/loading';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends RequestService {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);
  private readonly _loadingService = inject(LoadingService);

  private readonly _url = '/exercises';

  updateExercise(id: string, editedExercise: Partial<Exercise>): Observable<Exercise> {
    this._loadingService.setLoading(LOADING_KEYS.update_exercise, true);
    return this.update<Exercise>(this._url, editedExercise, id).pipe(
      tap(() => this._notificationService.createSuccess('¡Ejercicio guardado!')),
      catchError((err) => {
        this._notificationService.createError('No se pudo editar el ejercicio')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.update_exercise))
    )
  }
  
  createExercise(workoutId: number, newExercise: Exercise): Observable<Exercise> {
    this._loadingService.setLoading(LOADING_KEYS.create_exercise, true);
    return this.create<Exercise>(this._url, newExercise, { workoutId }).pipe(
      tap(() => this._notificationService.createSuccess('¡Ejercicio añadido!')),
      catchError((err) => {
        this._notificationService.createError('No se pudo crear el ejercicio')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.create_exercise))
    )
  }
  
  deleteExercise(id: number): Observable<void> {
    this._loadingService.setLoading(LOADING_KEYS.delete_exercise, true);
    return this.delete(this._url, id).pipe(
      tap(() => this._notificationService.createSuccess('¡Ejercicio eliminado!')),
      catchError((err) => {
        this._notificationService.createError('No se pudo eliminar el ejercicio')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.delete_exercise))
    )
  }

  getClosestExercises(date: string, name: string): Observable<ClosestExercise[]> {
    this._loadingService.setLoading(LOADING_KEYS.close_exercise, true);
    return this.getAll<ClosestExercise>(`${this._url}/closest`, { date, name}).pipe(
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener ejercicios anteriores')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.close_exercise))
    )
  }

  createCollectionExercise(CollectionExercise: CollectionExercise): Observable<CollectionExercise> {
    this._loadingService.setLoading(LOADING_KEYS.create_list_exercise, true);
    return this.create<CollectionExercise>(`${this._url}/list`, CollectionExercise).pipe(
      tap(() => this._notificationService.createSuccess('¡Ejercicio añadido a la lista!')),
      catchError((err) => {
        this._notificationService.createError('No se pudo añadir el ejercicio a la lista')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.create_list_exercise))
    )
  }
}
