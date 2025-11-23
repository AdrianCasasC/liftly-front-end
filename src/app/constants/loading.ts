import { LoadingKeys } from "@app/models/common";

export const LOADING_KEYS: Record<LoadingKeys, LoadingKeys> = {
	get_all_workouts: 'get_all_workouts',
	get_workout_by_id: 'get_workout_by_id',
	create_workout: 'create_workout',
	update_workout: 'update_workout',
	delete_workout: 'delete_workout',
	update_exercise: 'update_exercise',
	create_exercise: 'create_exercise',
	delete_exercise: 'delete_exercise',
	close_exercise: 'close_exercise',
	create_list_exercise: 'create_list_exercise'
}