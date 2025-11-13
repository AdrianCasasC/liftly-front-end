export interface DropdownItem<T> {
	label: string;
	value: T;
}

export type LoadingKeys = 
'get_all_workouts'
|'get_workout_by_id'
| 'create_workout'
| 'update_workout'
| 'delete_workout'
| 'update_exercise'
| 'delete_exercise';