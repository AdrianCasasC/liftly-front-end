import { DropdownItem } from "@app/models/common";
import { ExerciseName, GymExercise, MuscleGroup } from "@app/models/training";

export const GYM_EXERCISES: GymExercise[] = [
	{
		label: 'Press banca',
		value: 'bench_press',
		muscle: 'chest'
	},
	{
		label: 'Pecho inclinado (Mancuernas)',
		value: 'incline_dumbbell_bench_press',
		muscle: 'chest'
	},
	{
		label: 'Pecho inclinado (Multipower)',
		value: 'incline_smith_bench_press',
		muscle: 'chest'
	},
	{
		label: 'Contractora',
		value: 'contractor',
		muscle: 'chest'
	},
	{
		label: 'Jalón al pecho (Agarre neutro ancho)',
		value: 'lat_pulldown_wide_neutral',
		muscle: 'back'
	},
	{
		label: 'Jalón al pecho (Agarre neutro estrecho)',
		value: 'lat_pulldown_narrow_neutral',
		muscle: 'back'
	},
	{
		label: 'Press militar (Multipower)',
		value: 'smith_militar_press',
		muscle: 'shoulder'
	},
	{
		label: 'Press militar (Barra)',
		value: 'bar_militar_press',
		muscle: 'shoulder'
	},
	{
		label: 'Press militar (Mancuerna)',
		value: 'dumbbell_militar_press',
		muscle: 'shoulder'
	},
	{
		label: 'Elevaciones laterales (Mancuerna)',
		value: 'dumbbell_lateral_raises',
		muscle: 'shoulder'
	},
	{
		label: 'Elevaciones laterales (Mancuerna)',
		value: 'pulley_lateral_raises',
		muscle: 'shoulder'
	},
	{
		label: 'Posterior',
		value: 'posterior',
		muscle: 'shoulder'
	},
	{
		label: 'Curl barra recta',
		value: 'straight_bar_curl',
		muscle: 'arm'
	},
	{
		label: 'Curl barra Z',
		value: 'z_bar_curl',
		muscle: 'arm'
	},
	{
		label: 'Curl banco Scott',
		value: 'scott_bench_curl',
		muscle: 'arm'
	},
	{
		label: 'Press francés',
		value: 'french_press',
		muscle: 'arm'
	},
	{
		label: 'Press katana',
		value: 'katana_press',
		muscle: 'arm'
	},
	{
		label: 'Peso Muerto',
		value: 'dead_lift',
		muscle: 'leg'
	},
	{
		label: 'Zancadas',
		value: 'strides',
		muscle: 'leg'
	},
	{
		label: 'Hacka',
		value: 'hack',
		muscle: 'leg'
	},
	{
		label: 'Extensora de cuádriceps',
		value: 'quadriceps_extensor',
		muscle: 'leg'
	},
	{
		label: 'Curl femoral (Sentado)',
		value: 'seated_femoral_cur',
		muscle: 'leg'
	},
	{
		label: 'Curl femoral (Tumbado)',
		value: 'lying_femoral_cur',
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