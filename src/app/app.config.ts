import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppGlobals } from './app.global';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from './Services/custom-toast.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './Services/Interceptor/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

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
