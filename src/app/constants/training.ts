import { DropdownItem } from "@app/models/common";
import { ExerciseName } from "@app/models/training";

export const  GYM_EXERCISES: DropdownItem<ExerciseName>[] = [
	{
		label: 'Press Banca',
		value: 'bench_press'
	},
	{
		label: 'Peso Muerto',
		value: 'dead_lift'
	},
	{
		label: 'Sentadilla',
		value: 'squad'
	}
]