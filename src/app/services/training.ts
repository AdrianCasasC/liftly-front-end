import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from './request';
import { ClosestExercise, Exercise, ExerciseSet, Workout } from '@app/models/training';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification';
import { LoadingService } from './loading-service';
import { LOADING_KEYS } from '@app/constants/loading';

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
    this._loadingService.setLoading(LOADING_KEYS.get_all_workouts, true);
    return this.getAll<Workout>(this._url, params).pipe(
      tap((res) => {
        this._allWorkouts.set(res.map(work => {
          work.exercises.forEach(exerc => exerc.prevs = []);
          return work;
        }))
      }),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener los entrenamientos ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.get_all_workouts))
    )
  }

  refreshWorkoutExerciseByIndex(workoutIdx: number, exerciseIdx: number, exercise: Exercise): void {
    this._allWorkouts.update(prev => {
      prev[workoutIdx].exercises[exerciseIdx] = exercise;
      return prev
    });
  }

  refreshCreateWorkoutExercise(workoutIdx: number, exercise: Exercise): void {
    this._allWorkouts.update(prev => {
      prev[workoutIdx].exercises.push(exercise);
      return prev
    });
  }

  refreshDeleteWorkoutExercise(workoutIdx: number, exerciseId: number): void {
    this._allWorkouts.update(prev => {
      prev[workoutIdx].exercises = prev[workoutIdx].exercises.filter(exerc => exerc.id !== exerciseId);
      return prev
    })
  }

  getSetRepsDiff(set: ExerciseSet, prevSet: ExerciseSet): number | null {
    if (!set || !prevSet) return null;
    return set.reps - prevSet.reps;
  }

  getSetWeightDiff(set: ExerciseSet, prevSet: ExerciseSet): number | null {
    if (!set || !prevSet) return null;
    return set.weight - prevSet.weight;
  }

  fillPrevExercises(prevExercises: ClosestExercise[], workoutId: number, exercise: Exercise): void {
    const workoutIdx = this._allWorkouts().findIndex(workout => workout.id === workoutId);
    if (workoutIdx < 0) return;
    this._allWorkouts.update(prev => {
      const exercToFill = prev[workoutIdx].exercises.find(exerc => exerc.id === exercise.id);
      if (exercToFill) {
        exercToFill.prevs = prevExercises.map(prevExerc => ({ 
          date: prevExerc.workoutDate,
          sets: prevExerc.sets.map((prevSet, idx) => ({
            ...prevSet,
            diffReps: this.getSetRepsDiff(exercise.sets[idx], prevSet) || 0,
            diffWeight: this.getSetWeightDiff(exercise.sets[idx], prevSet) || 0
          })),
        }))
      }
      return prev;
    })
  }

  getWorkout(id: string): Observable<Workout> {
    const mapKey = 'getById';
    this._loadingService.setLoading(LOADING_KEYS.get_workout_by_id, true);
    return this.getById<Workout>(id, this._url).pipe(
      tap(res => this._workout.set(res)),
      catchError((err) => {
        this._notificationService.createError('No se pudo obtener el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.get_workout_by_id))
    )
  }

  createWorkout(workout: Workout, date: string): Observable<Workout> {
    this._loadingService.setLoading(LOADING_KEYS.create_workout, true);
    return this.create<Workout>(this._url, workout, { creationDate: date}).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  creado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo crear el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.create_workout))
    );
  }

  updateWorkout(workout: Workout, id: string): void {
    const mapKey = 'update';
    this._loadingService.setLoading(LOADING_KEYS.update_workout, true);
    this.update<Workout>(this._url, workout, id).pipe(
      tap(resp => this._notificationService.createSuccess('¡Entrenamiento  guardado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo guardar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.update_workout))
    ).subscribe();
  }

  deleteWorkout(id: string): void {
    const mapKey = 'delete';
    this._loadingService.setLoading(LOADING_KEYS.delete_workout, true);
    this.delete(id, this._url).pipe(
      tap(() => this._notificationService.createSuccess('¡Entrenamiento  eliminado! ✅')),
      catchError((err) => {
        this._notificationService.createError('No se pudo eliminar el entrenamiento ⚠️')
        return throwError(() => new Error(err));
      }),
      finalize(() => this._loadingService.removeLoading(LOADING_KEYS.delete_workout))
    ).subscribe();
  }
}
