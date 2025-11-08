import { DropdownItem } from "./common";

interface Set {
	order: number;
	reps: number;
	weight: number;
}

export interface Exercise {
	name: ExerciseName;
	sets: Set[]
}

export interface Workout {
	name: string;
	exercises: Exercise[]
}

export type ExerciseName =
'bench_press'
| 'incline_dumbbell_bench_press'
| 'incline_smith_bench_press'
| 'contractor'
| 'squad'
| 'dead_lift'
| 'lat_pulldown_wide_neutral'
| 'lat_pulldown_narrow_neutral'
| 'smith_militar_press'
| 'bar_militar_press'
| 'dumbbell_militar_press'
| 'dumbbell_lateral_raises'
| 'pulley_lateral_raises'
| 'posterior'
| 'straight_bar_curl'
| 'z_bar_curl'
| 'scott_bench_curl'
| 'french_press'
| 'katana_press'
| 'strides'
| 'hack'
| 'quadriceps_extensor'
| 'seated_femoral_cur'
| 'lying_femoral_cur';

export type MuscleGroup = 'chest' | 'back' | 'leg' | 'arm' | 'shoulder'

export interface GymExercise extends DropdownItem<ExerciseName> {
	muscle: MuscleGroup;
}