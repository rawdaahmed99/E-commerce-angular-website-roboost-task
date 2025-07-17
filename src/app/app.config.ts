import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// لو بتستخدمي ngx-translate
import { TranslateModule } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // ✅ مهم جدًا عشان HttpClient يشتغل
    importProvidersFrom(TranslateModule.forRoot()) // ✅ لو بتستخدمي ngx-translate
  ]
};
