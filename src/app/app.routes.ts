import { Routes } from '@angular/router';
import { SignInComponent } from './Gateway/SignIn/sign-in/sign-in.component';

export const routes: Routes = [
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // { path: '**', redirectTo: 'login' },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'admin',
    component: SignInComponent,
  },
];
