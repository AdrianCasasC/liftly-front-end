import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home-page/home-page').then(
            (m) => m.HomePage
            ),
    },
    {
        path: 'training',
        loadComponent: () =>
            import('./pages/training-page/training-page').then(
            (m) => m.TrainingPage
            ),
    },
    {
        path: 'weight',
        loadComponent: () =>
            import('./pages/weight-page/weight-page').then(
            (m) => m.WeightPage
            ),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];