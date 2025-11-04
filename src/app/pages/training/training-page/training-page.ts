import { Component, signal } from '@angular/core';
import { AddButton } from '@app/components/add-button/add-button';
import { Exercise, Workout } from '@app/models/training';

@Component({
  selector: 'app-training-page',
  imports: [AddButton],
  templateUrl: './training-page.html',
  styleUrl: './training-page.scss',
})
export class TrainingPage {
  /* Signals */
  isAddingNewWorkout = signal<boolean>(false);

  /* Variables */
  newWorkout: Workout | null = null;
  newWorkoutExercises: Exercise[] = [];

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
    const newExercise: Exercise = {
      name: 'bench-press',
      sets: []
    }
    this.newWorkoutExercises.push(newExercise);
  }

}
