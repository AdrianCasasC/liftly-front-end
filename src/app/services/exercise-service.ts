import { inject, Injectable } from '@angular/core';
import { RequestService } from './request';
import { Exercise } from '@app/models/training';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { NotificationService } from './notification';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends RequestService {
  /* Injections */
  private readonly _notificationService = inject(NotificationService);
  private readonly _loadingService = inject(LoadingService);

  private readonly _url = '/exercises';

  updateExercise(id: string, editedExercise: Partial<Exercise>): Observable<Exercise> {
    const mapKey = 'update_exercise';
    this._loadingService.setLoading(mapKey, true);
    return this.update<Exercise>(this._url, editedExercise, id).pipe(
      catchError((err) => {
        this._notificationService.createError('No se pudo editar el ejercicio ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(mapKey))
    )
  }
}
