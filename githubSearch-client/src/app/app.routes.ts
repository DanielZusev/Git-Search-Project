import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
    { path: 'search', loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent) },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
