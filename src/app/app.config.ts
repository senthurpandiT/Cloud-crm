import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppGlobals } from './app.global';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './Authentication/Interceptor/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomToastComponent } from './Components/Shared/custom-toast.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

  ],
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}