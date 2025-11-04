import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('@pages/home-page/home-page').then(
            (m) => m.HomePage
            ),
    },
    {
        path: 'training',
        loadChildren: () =>
            import('@pages/training/training.routes').then(
              (m) => m.trainingRoutes
            ),
    },
    {
        path: 'weight',
        loadComponent: () =>
            import('@pages/weight-page/weight-page').then(
            (m) => m.WeightPage
            ),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];