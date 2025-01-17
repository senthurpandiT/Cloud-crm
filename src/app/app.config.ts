import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppGlobals } from './app.global';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './Authentication/Interceptor/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AppGlobals,
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideToastr(),
  ],
};
