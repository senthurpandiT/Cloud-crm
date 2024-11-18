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
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    BrowserAnimationsModule,
    AppGlobals,
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      // required animations module
      ToastrModule.forRoot({
        toastComponent: CustomToastComponent,
        closeButton: true,
        positionClass: 'toast-top-right',
        newestOnTop: false, // added custom toast!
      })
    ),
  ],
};
