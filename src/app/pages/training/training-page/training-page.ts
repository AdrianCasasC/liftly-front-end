import { Component, inject, OnInit, signal } from '@angular/core';
import { AddButton } from '@app/components/add-button/add-button';
import { GYM_EXERCISES } from '@app/constants/training';
import { Exercise, Workout } from '@app/models/training';
import { ToLabelPipe } from '@app/pipes/to-label-pipe';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-training-page',
  imports: [AddButton, NzDropDownModule, NzIconModule, ToLabelPipe, ReactiveFormsModule],
  templateUrl: './training-page.html',
  styleUrl: './training-page.scss',
})
export class TrainingPage {
  /** Injections */
  private readonly _fb = inject(FormBuilder);
  /* Signals */
  isAddingNewWorkout = signal<boolean>(false);

  /* Variables */
  newWorkout: Workout | null = null;
  allGymExercises = GYM_EXERCISES;
  workoutForm: FormGroup = this._fb.group({
    exercises: this._fb.array([])
  });

  get exercises() {
    return this.workoutForm.controls['exercises'] as FormArray;
  }

  getFormArrayFromGroup(group: AbstractControl<any, any>, controlName: string): FormArray {
    return group.get(controlName) as FormArray
  }

  onCreateNewWorkout(): void {
    this.isAddingNewWorkout.set(true);
  }

  onConfirmCreateNewWorkout(): void {
    this.isAddingNewWorkout.set(false);
  }

  onCancelNewWorkout(): void {
    this.isAddingNewWorkout.set(false);
  }

  onAddExercise(): void {
    const exerciseForm = this._fb.group({
      name: ['bench_press', Validators.required],
      numberSets: [1, Validators.required],
      sets: this._fb.array([{
        reps: [0],
        weight: [0]
      }])
    })
    const setsArray = exerciseForm.get('sets') as FormArray;
    exerciseForm.get('numberSets')?.valueChanges.subscribe((value: number | null) => {
      setsArray.clear();
      if (value === null) return;
      for (let i = 0; i < value; i++) {
        const set = this._fb.group({
          reps: [0],
          weight: [0] 
        })
        setsArray.push(set);
      }
    })
    this.exercises.push(exerciseForm);
  }


  onRemoveExercise(exercIndex: number): void {
    this.exercises.removeAt(exercIndex);
  }

  getFormGroup(form: AbstractControl<any, any>): FormGroup {
    return form as FormGroup;
  }

  onSubmit(): void {

  }

}
