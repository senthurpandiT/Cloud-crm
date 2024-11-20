import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppGlobals } from './app.global';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './Authentication/Interceptor/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomToastComponent } from './Components/Shared/custom-toast.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AppGlobals,
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    importProvidersFrom(
      ToastrModule.forRoot({
        toastComponent: CustomToastComponent,
        closeButton: true,
        positionClass: 'toast-top-right',
        newestOnTop: false,
      })
    ),
  ],
};
