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

export type ExerciseName = 'bench_press' | 'squad' | 'dead_lift'