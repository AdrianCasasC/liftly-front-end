import { Component, inject, OnInit, signal } from '@angular/core';
import { AddButton } from '@app/components/add-button/add-button';
import { getExercisesByMuscleGroup, GYM_EXERCISES, MUSCLE_GROUPS } from '@app/constants/training';
import { Exercise, ExerciseName, GymExercise, MuscleGroup, Workout } from '@app/models/training';
import { ToLabelPipe } from '@app/pipes/to-label-pipe';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { minLengthArray } from '@app/validators/validators';
import { TrainingService } from '@app/services/training';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'app-training-page',
  imports: [AddButton, NzDropDownModule, NzIconModule, ToLabelPipe, ReactiveFormsModule, NzCollapseModule],
  templateUrl: './training-page.html',
  styleUrl: './training-page.scss',
})
export class TrainingPage {
  /** Injections */
  private readonly _fb = inject(FormBuilder);
  private readonly _trainingService = inject(TrainingService);

  /* Signals */
  isAddingNewWorkout = signal<boolean>(false);
  allWorkouts = this._trainingService.allWorkouts;
  selectedWorkout = this._trainingService.workout;

  /* Variables */
  newWorkout: Workout | null = null;
  muscleGroups = MUSCLE_GROUPS;
  gymExercises = GYM_EXERCISES;
  workoutForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    exercises: this._fb.array([], [minLengthArray(1)])
  });

  get exercises() {
    return this.workoutForm.controls['exercises'] as FormArray;
  }


  getFormArrayFromGroup(group: AbstractControl<any, any>, controlName: string): FormArray {
    return group.get(controlName) as FormArray
  }

  getExerciseOptionsByMuscle(muscle: MuscleGroup): GymExercise[] {
    return getExercisesByMuscleGroup(muscle);
  }

  onCreateNewWorkout(): void {
    this.isAddingNewWorkout.set(true);
  }

  onConfirmCreateNewWorkout(): void {
    // TODO: Llamada a servicio y en el suscribe meter esto
    if (this.workoutForm.invalid) return;
    console.log('WorkoutForm: ', this.workoutForm.value);
    this.isAddingNewWorkout.set(false);
  }

  onCancelNewWorkout(): void {
    this.isAddingNewWorkout.set(false);
  }

  onAddExercise(): void {
    const exerciseForm = this._fb.group({
      muscle: ['chest', Validators.required],
      name: ['bench_press', Validators.required],
      numberSets: [1, Validators.required],
      sets: this._fb.array([this._fb.group({
        reps: [null],
        weight: [null] 
      })])
    });
    exerciseForm.get('muscle')?.valueChanges.subscribe((value: string | null) => {
      exerciseForm.patchValue({
        name: this.getExerciseOptionsByMuscle(value as MuscleGroup)[0].value
      })
    });
    const setsArray = exerciseForm.get('sets') as FormArray;
    exerciseForm.get('numberSets')?.valueChanges.subscribe((value: number | null) => {
      setsArray.clear();
      if (value === null) return;
      for (let i = 0; i < value; i++) {
        const set = this._fb.group({
          reps: [null],
          weight: [null] 
        })
        setsArray.push(set);
      }
    })
    this.exercises.push(exerciseForm);
  }

  onSelectMuscleGroup(value: MuscleGroup, exerciseIndex: number): void {
    this.exercises.at(exerciseIndex).patchValue({
      muscle: value
    });
  }

  onSelectExercise(value: ExerciseName, exerciseIndex: number): void {
    this.exercises.at(exerciseIndex).patchValue({
      name: value
    });
  }

  onRemoveExercise(exercIndex: number): void {
    this.exercises.removeAt(exercIndex);
  }

  getFormGroup(form: AbstractControl<any, any>): FormGroup {
    return form as FormGroup;
  }

}
