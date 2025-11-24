import { DropdownItem } from "@app/models/common";
import { Exercise, ExerciseName, GymExercise, MuscleGroup } from "@app/models/training";

export const GYM_EXERCISES: GymExercise[] = [
	{
		label: 'Press banca',
		value: 'bench_press',
		muscle: 'chest'
	},
	{
		label: 'Press banca  (Multipower)',
		value: 'smith_bench_press',
		muscle: 'chest'
	},
	{
		label: 'Press inclinado (Mancuernas)',
		value: 'incline_dumbbell_bench_press',
		muscle: 'chest'
	},
	{
		label: 'Press inclinado (Multipower)',
		value: 'incline_smith_bench_press',
		muscle: 'chest'
	},
	{
		label: 'Contractora',
		value: 'contractor',
		muscle: 'chest'
	},
	{
		label: 'Pecho Superior (Máquina)',
		value: 'upper_chest_machine',
		muscle: 'chest'
	},
	{
		label: 'Pecho plano (Máquina)',
		value: 'plain_chest_machine',
		muscle: 'chest'
	},
	{
		label: 'Cruces de Polea',
		value: 'pulley_crossovers',
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
		label: 'Jalón al pecho (Agarre prono)',
		value: 'lat_pulldown_prone_grip',
		muscle: 'back'
	},
	{
		label: 'Jalón al pecho (Agarre supino)',
		value: 'lat_pulldown_supine_grip',
		muscle: 'back'
	},
	{
		label: 'Remo Gironda',
		value: 'gironde_rownig',
		muscle: 'back'
	},
	{
		label: 'Remo bajo polea (Agarre neutro ancho)',
		value: 'lower_pulley_rowing_neutral_wide_grip',
		muscle: 'back'
	},
	{
		label: 'Remo bajo polea (Agarre neutro estrecho)',
		value: 'lower_pulley_rowing_neutral_narrow_grip',
		muscle: 'back'
	},
	{
		label: 'Remo barra (Multipower)',
		value: 'smith_barbell_row',
		muscle: 'back'
	},
	{
		label: 'Pullover',
		value: 'pullover',
		muscle: 'back'
	},
	{
		label: 'Remo máquina (Unilateral)',
		value: 'unilateral_machine_row',
		muscle: 'back'
	},
	{
		label: 'Remo alto banco polea (Unilateral)',
		value: 'unilateral_machine_row',
		muscle: 'back'
	},
	{
		label: 'Remo mancuerna (Unilateral)',
		value: 'unilateral_dumbbell_row',
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
		label: 'Elevaciones laterales (Polea)',
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
		label: 'Curl macuerna (Unilateral)',
		value: 'unilateral_dumbbell_curl',
		muscle: 'arm'
	},
	{
		label: 'Curl polea baja codo avanzado (Unilateral)',
		value: 'unilateral_advanced_low_pulley_curl_elbow',
		muscle: 'arm'
	},
	{
		label: 'Press francés',
		value: 'french_press',
		muscle: 'arm'
	},
	{
		label: 'Press francés banco polea',
		value: 'pulley_bench_french_press',
		muscle: 'arm'
	},
	{
		label: 'Press katana',
		value: 'katana_press',
		muscle: 'arm'
	},
	{
		label: 'Tríceps polea alta (Unilateral)',
		value: 'high_pulley_triceps',
		muscle: 'arm'
	},
	{
		label: 'Peso Muerto',
		value: 'dead_lift',
		muscle: 'leg'
	},
	{
		label: 'Peso Muerto Rumano (Barra)',
		value: 'rumanian_bar_dead_lift',
		muscle: 'leg'
	},
	{
		label: 'Peso Muerto Rumano (Mancuerna)',
		value: 'rumanian_dumbell_dead_lift',
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
	},
	{
		label: 'Hip Thrust',
		value: 'hip_thrust',
		muscle: 'leg'
	},
	{
		label: 'Patada Glúteo (Máquina)',
		value: 'glute_kick',
		muscle: 'leg'
	},
	{
		label: 'Gemelos',
		value: 'twins',
		muscle: 'leg'
	},
	{
		label: 'Abductor',
		value: 'abductor_machine',
		muscle: 'leg'
	},
	{
		label: 'Gluteo (Máquina)',
		value: 'glute_machine',
		muscle: 'leg'
	},
	{
		label: 'Oblicuos (Polea)',
		value: 'onblique_pulley_abs',
		muscle: 'abs'
	},
	{
		label: 'Abdomen (Máquina)',
		value: 'machine_crunches',
		muscle: 'abs'
	},
	{
		label: 'Abdomen (Polea)',
		value: 'pulley_crunches',
		muscle: 'abs'
	},
	{
		label: 'Rueda abdominal',
		value: 'abs_roll',
		muscle: 'abs'
	},
	{
		label: 'Gemelos',
		value: 'twins',
		muscle: 'leg'
	}
]


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
	},
	{
		label: 'Abdomen',
		value: 'abs'
	}
]