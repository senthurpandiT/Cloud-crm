import { Routes } from '@angular/router';
import { SignInComponent } from './Gateway/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './Gateway/forget-password/forget-password.component';
import { SignUpComponent } from './Gateway/sign-up/sign-up.component';
import { DashboardComponent } from './Components/User/dashboard/dashboard.component';

export const routes: Routes = [
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SignInComponent, data:
      { animation: 'loginPage' }
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent, data: { animation: 'forgotpasswordPage' }
  },
  {
    path: 'signup',
    component: SignUpComponent, data: { animation: 'signupPage' }
  },
  {
    path: 'admin',
    component: SignInComponent, data: { animation: 'adminPage' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent, data: { animation: 'dashboardPage' }
  },
];
