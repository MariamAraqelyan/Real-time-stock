import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInter } from '@real-time-stock/domain';
import { StockFeedAdapter } from '@real-time-stock/infrastructure';

@Injectable({
  providedIn: 'root',
})
export class Stock {
  private feed = inject(StockFeedAdapter);

  getStocks(): Observable<StockInter[]> {
    return this.feed.getPrices();
  }
}
