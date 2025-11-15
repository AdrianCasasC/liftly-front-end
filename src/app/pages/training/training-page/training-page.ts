import { Component, inject, OnInit, signal } from '@angular/core';
import { AddButton } from '@app/components/add-button/add-button';
import { getExercisesByMuscleGroup, getMuscleGroupByExercise, GYM_EXERCISES, MUSCLE_GROUPS } from '@app/constants/training';
import { Exercise, ExerciseName, ExerciseSet, GymExercise, MuscleGroup, Workout } from '@app/models/training';
import { ToLabelPipe } from '@app/pipes/to-label-pipe';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { minLengthArray } from '@app/validators/validators';
import { TrainingService } from '@app/services/training';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ExerciseService } from '@app/services/exercise-service';
import { LoadingService } from '@app/services/loading-service';
import { LOADING_KEYS } from '@app/constants/loading';
import { ActivatedRoute } from '@angular/router';

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
  private readonly _exerciseService = inject(ExerciseService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _route = inject(ActivatedRoute);

  /* Signals */
  isAddingNewWorkout = signal<boolean>(false);
  allWorkouts = this._trainingService.allWorkouts;
  selectedWorkout = this._trainingService.workout;
  loadingMap = this._loadingService.loadingMap

  /* Variables */
  private startX = 0;
  private currentX = 0;
  private distance = 0;
  private base = 0;
  private isDragging = false;
  private threshold = 60;
  private draggingElement: HTMLDivElement | null = null;
  private deleteElement: HTMLDivElement | null = null;
  LOADING_KEYS = LOADING_KEYS;
  newWorkout: Workout | null = null;
  muscleGroups = MUSCLE_GROUPS;
  gymExercises = GYM_EXERCISES;
  activeWorkout: number | null = null;
  editingExerc: number | null = null;
  day: string = '';
  isAddingNewExercise: boolean = false;
  edditingWorkoutId: number | null = null;
  deleteExercId: number | null = null;
  workoutForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    exercises: this._fb.array([], [minLengthArray(1)])
  });
  editExercForm = this._fb.group({
    name: ['', Validators.required],
    muscle: [''],
    sets: this._fb.array([this._fb.group({
      orderNumber: [0],
      reps: [null],
      weight: [null] 
    })])
  });
  newExercForm = this._fb.group({
    name: ['', Validators.required],
    muscle: [''],
    sets: this._fb.array([this._fb.group({
      orderNumber: [0],
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

  private getAllWorkouts(): void {
    this._trainingService.getAllWorkouts({ date: this.day.replace('Z', '') }).subscribe();
  }

  ngOnInit(): void {
    this.day = this._route.snapshot.queryParamMap.get('date') ?? '';
    this.getAllWorkouts();
  }


  getFormArrayFromGroup(group: AbstractControl<any, any>, controlName: string): FormArray {
    return group.get(controlName) as FormArray
  }

  getExerciseOptionsByMuscle(muscle: string): GymExercise[] {
    return getExercisesByMuscleGroup(muscle as MuscleGroup);
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

  onAddExerciseEdition(workoutId: number): void {
    this.edditingWorkoutId = workoutId;
    this.isAddingNewExercise = true;
  }

  onConfirmAddExercise(): void {
    const newExercSets: ExerciseSet[] = [];
    this.newExercForm.value.sets?.forEach(({orderNumber, reps, weight}) => {
      newExercSets.push({
        orderNumber: orderNumber ?? 0,
        reps: reps ?? 0,
        weight: weight ?? 0
      })
    });
    const newExerc: Exercise = {
      name: this.newExercForm.value.name as ExerciseName,
      sets: newExercSets
    }
    this._exerciseService.createExercise( this.edditingWorkoutId ?? 0, newExerc).subscribe({
      next: () => {
        this.isAddingNewExercise = false;
        this.newExercForm.reset();
        const setsArray = this.newExercForm.get('sets') as FormArray;
        setsArray.clear();
        setsArray.push(this._fb.group({
          orderNumber: [0],
          reps: [null],
          weight: [null] 
        }));
        this.getAllWorkouts();
      }
    });
  }

  onCancelAddExercise(): void {
    this.isAddingNewExercise = false;
  }

  onReplicateSerie(exerciseForm: FormGroup): void {
    const newFormSets = exerciseForm.get('sets') as FormArray;
    if (newFormSets?.value?.length && newFormSets.value.length > 0 ) {
      const lastSet = newFormSets.value[newFormSets.value.length - 1]
      const set = this._fb.group({
        orderNumber: [lastSet.orderNumber + 1],
        reps: [lastSet.reps],
        weight: [lastSet.weight] 
      });
      newFormSets.push(set);
    } else {
      newFormSets.push(this._fb.group({
        orderNumber: [0],
        reps: null,
        weight: null 
      }))
    }
  }

  onSelectMuscleGroup(value: MuscleGroup, formGroup: FormGroup): void {
    formGroup.patchValue({
      muscle: value
    })
  }

  onSelectExercise(value: ExerciseName, formGroup: FormGroup): void {
    formGroup.patchValue({
      name: value
    })
  }

  onActiveCollapse(workoutId: number, active: boolean):void {
    this.activeWorkout = active ? workoutId : null;
  }

  onRemoveExercise(exercIndex: number): void {
    this.exercises.removeAt(exercIndex);
  }

  onEditExercise(exercise: Exercise): void {
    this.editingExerc = exercise.id!;
    const editSets = this._fb.array(
      exercise.sets.map(({reps, weight, orderNumber}) => this._fb.group({
        reps,
        weight,
        orderNumber
      }))
    )

    this.editExercForm.patchValue({
      name: exercise.name,
      muscle: getMuscleGroupByExercise(exercise)
      // Don't patch 'sets' directly since it's a FormArray, handle manually below
    });

    // Clear existing sets and add new ones from editSets FormArray
    const setsControl = this.editExercForm.get('sets') as FormArray;
    setsControl.clear();
    (editSets.controls as FormGroup[]).forEach(setGroup => {
      setsControl.push(setGroup);
    });
  }

  onDeleteExercise(id: number): void {
    this.deleteExercId = id;
    this._exerciseService.deleteExercise(id).subscribe({
      next: () => {
        this.deleteExercId = null;
        this.getAllWorkouts();
      }
    });
  }

  onDeleteSerie(exerciseForm: FormGroup, serieIndx: number): void {
    const sets = exerciseForm.get('sets') as FormArray;
    sets.removeAt(serieIndx);
  }

  onCloseEditing(): void {
    this.editingExerc = null;
  }

  onSubmitEditing(): void {
    const setsFormValue = this.editExercForm.value.sets as any[];
    const sets: ExerciseSet[] = setsFormValue.map((s, idx) => ({
      reps: s.reps,
      weight: s.weight,
      orderNumber: s.orderNumber ?? idx
    }));
    const editedExercise: Partial<Exercise> = {
      name: this.editExercForm.value.name! as ExerciseName,
      sets
    }
    this._exerciseService.updateExercise(this.editingExerc?.toString() ?? '', editedExercise).subscribe({
      next: () => {
        this.getAllWorkouts();
        this.onCloseEditing();
      }
    });
    
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
        this.draggingElement.style.backgroundColor = 'hsl(var(--background))';
        this.deleteElement.style.width = `${0}px`;
        this.deleteElement.style.backgroundColor = 'transparent';
      }
    }
  }
}
