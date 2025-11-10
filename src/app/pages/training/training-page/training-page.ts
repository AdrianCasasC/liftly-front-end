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
export class TrainingPage implements OnInit {
  /** Injections */
  private readonly _fb = inject(FormBuilder);
  private readonly _trainingService = inject(TrainingService);

  /* Signals */
  isAddingNewWorkout = signal<boolean>(false);
  allWorkouts = this._trainingService.allWorkouts;
  selectedWorkout = this._trainingService.workout;

  /* Variables */
  private startX = 0;
  private currentX = 0;
  private distance = 0;
  private base = 0;
  private isDragging = false;
  private threshold = 60;
  private draggingElement: HTMLDivElement | null = null;
  private deleteElement: HTMLDivElement | null = null;
  newWorkout: Workout | null = null;
  muscleGroups = MUSCLE_GROUPS;
  gymExercises = GYM_EXERCISES;
  activeWorkout: number | null = null;
  editingExerc: number | null = null;
  workoutForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    exercises: this._fb.array([], [minLengthArray(1)])
  });
  editExercForm = this._fb.group({
    muscle: [''],
    name: [''],
    numberSets: [null],
    sets: this._fb.array([this._fb.group({
      reps: [null],
      weight: [null] 
    })])
  });

  get exercises() {
    return this.workoutForm.controls['exercises'] as FormArray;
  }

  private getClientX(event: TouchEvent | MouseEvent): number {
    return event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
  }

  ngOnInit(): void {
    this._trainingService.getAllWorkouts().subscribe();
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
    if (this.workoutForm.invalid) return;
    this._trainingService.createWorkout(this.workoutForm.value)
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

  onActiveCollapse(workoutId: number, active: boolean):void {
    this.activeWorkout = active ? workoutId : null;
  }

  onRemoveExercise(exercIndex: number): void {
    this.exercises.removeAt(exercIndex);
  }

  onEditExercise(exerciseId: number): void {
    // TODO: Rellenar el form de edicion con los datos
    // getexercById
    this.editingExerc = exerciseId;
  }

  onSubmitEditing(): void {
    this.editingExerc = null;
  }

  getFormGroup(form: AbstractControl<any, any>): FormGroup {
    return form as FormGroup;
  }

  onTouchStart(event: TouchEvent | MouseEvent, elementId: string) {
    this.draggingElement = document.getElementById(elementId) as HTMLDivElement;
    this.deleteElement = document.getElementById('delete_' + elementId) as HTMLDivElement;
    
    this.isDragging = true;
    this.startX = this.getClientX(event);
    if (this.draggingElement) {
      const rect = this.draggingElement.getBoundingClientRect();
      const style = window.getComputedStyle(this.draggingElement);
      const currentTransform = style.transform;
      this.base = rect.left ?? 0;
    }
  }

  onTouchMove(event: TouchEvent | MouseEvent) {
    if (!this.isDragging) return;
    if (this.draggingElement && this.deleteElement) {
      this.currentX = this.getClientX(event);
      
      const diffX = this.currentX - this.startX + this.base;
  
      if (diffX > 0) return
      this.draggingElement.style.transform = `translateX(${diffX}px)`;
      this.deleteElement.style.width = `${(diffX + -6) * -1}px`;
      let opacity = diffX > -this.threshold ? -diffX / this.threshold : 1
      this.draggingElement.style.backgroundColor = `rgba(97, 74, 54, ${opacity})`;
      this.deleteElement.style.backgroundColor = `rgba(208, 47, 47, ${opacity})`;
    }
    
  }

  onTouchEnd() {
    this.isDragging = false;
    if (this.draggingElement && this.deleteElement) {
      const rect = this.draggingElement.getBoundingClientRect();
      this.distance = rect.left || 0;
      if (this.distance <= -this.threshold) {
        this.draggingElement.style.transform = `translateX(${-this.threshold}px)`;
        this.deleteElement.style.width = `${this.threshold + 6}px`;
      } else {
        this.draggingElement.style.transform = `translateX(${0}px)`;
        this.draggingElement.style.backgroundColor = 'hsl(var(--muted) / 0.5)';
        this.deleteElement.style.width = `${0}px`;
        this.deleteElement.style.backgroundColor = 'transparent';
      }
    }
  }
}
