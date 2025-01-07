import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./Gateway/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Gateway/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./Gateway/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Modules/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
