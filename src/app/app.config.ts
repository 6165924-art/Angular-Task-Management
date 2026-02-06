import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authinterceptor } from './interceptors/authInterceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authinterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    })
    // provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
