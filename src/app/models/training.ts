import { DropdownItem } from "./common";

export interface ExerciseSet {
	id?: number;
	orderNumber: number;
	reps: number;
	weight: number;
}

export interface PrevExerciseSet extends ExerciseSet {
	diffReps?: number;
	diffWeight?: number;
}

export interface PrevExercise {
	date: string;
	sets: PrevExerciseSet[];
}

export interface Exercise {
	id?: number;
	name: ExerciseName;
	prevs: PrevExercise[];
	sets: ExerciseSet[];
}

export interface Workout {
	id?: number;
	name: string;
	exercises: Exercise[];
	createdAt: Date;
}

export interface ClosestExercise {
	exerciseId?: number;
	workoutId: number;
	exerciseName: string;
	workoutName: string;
	workoutDate: string;
	sets: ExerciseSet[];
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
| 'lying_femoral_cur'
| 'smith_bench_press'
| 'upper_chest_machine'
| 'plain_chest_machine'
| 'pulley_crossovers'
| 'lat_pulldown_prone_grip'
| 'lat_pulldown_supine_grip'
| 'gironde_rownig'
| 'lower_pulley_rowing_neutral_wide_grip'
| 'lower_pulley_rowing_neutral_narrow_grip'
| 'smith_barbell_row'
| 'pullover'
| 'unilateral_machine_row'
| 'unilateral_dumbbell_row'
| 'unilateral_dumbbell_curl'
| 'unilateral_advanced_low_pulley_curl_elbow'
| 'pulley_bench_french_press'
| 'high_pulley_triceps'
| 'rumanian_bar_dead_lift'
| 'rumanian_dumbell_dead_lift'
| 'hip_thrust'
| 'glute_kick'
| 'twins';

export type MuscleGroup = 'chest' | 'back' | 'leg' | 'arm' | 'shoulder'

export interface GymExercise extends DropdownItem<ExerciseName> {
	muscle: MuscleGroup;
}