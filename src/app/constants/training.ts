import { DropdownItem } from "@app/models/common";
import { ExerciseName, GymExercise, MuscleGroup } from "@app/models/training";

export const GYM_EXERCISES: GymExercise[] = [
	{
		label: 'Press Banca',
		value: 'bench_press',
		muscle: 'chest'
	},
	{
		label: 'Peso Muerto',
		value: 'dead_lift',
		muscle: 'leg'
	},
	{
		label: 'Sentadilla',
		value: 'squad',
		muscle: 'leg'
	}
]

export const getExercisesByMuscleGroup = (muscleGroup: MuscleGroup): GymExercise[] => GYM_EXERCISES.filter(exerc => exerc.muscle === muscleGroup);


export const  MUSCLE_GROUPS: DropdownItem<MuscleGroup>[] = [
	{
		label: 'Pecho',
		value: 'chest'
	},
	{
		label: 'Espalda',
		value: 'back'
	},
	{
		label: 'Pierna',
		value: 'leg'
	},
	{
		label: 'Hombro',
		value: 'shoulder'
	},
	{
		label: 'Brazo',
		value: 'arm'
	}
]