import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '@real-time-stock/domain';
import { StockFeedPort } from '../ports/stock-feed.port';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private feed = inject(StockFeedPort);

  getStocks(): Observable<Stock[]> {
    return this.feed.getPrices();
  }
}
