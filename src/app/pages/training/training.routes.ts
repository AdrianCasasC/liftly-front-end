import { Routes } from '@angular/router';

export const trainingRoutes: Routes = [
	{
			path: '',
			loadComponent: () =>
					import('@pages/training/training-page/training-page').then(
					(m) => m.TrainingPage
					),
	},
	/* {
			path: 'add',
			loadComponent: () =>
					import('@pages/training/training-add-page/training-add-page').then(
					(m) => m.TrainingAddPage
					),
	}, */
];