import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StockFeedPort } from '@real-time-stock/application';
import { StockFeedAdapter } from '@real-time-stock/infrastructure';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: StockFeedPort,
      useClass: StockFeedAdapter
    }
  ]
};
