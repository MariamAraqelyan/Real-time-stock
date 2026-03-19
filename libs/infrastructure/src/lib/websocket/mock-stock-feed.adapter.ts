import { Injectable } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { Stock } from '@real-time-stock/domain';

const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'] as const;

@Injectable({ providedIn: 'root' })
export class MockStockFeedAdapter {
  getPrices(): Observable<Stock[]> {
    return interval(2000).pipe(
      map(() =>
        STOCKS.map(symbol => {
          const base = {
            AAPL: 190,
            GOOGL: 140,
            MSFT: 400,
            TSLA: 200
          }[symbol];

          const price = +(base + (Math.random() - 0.5) * 2).toFixed(2);
          const high = price + Math.random() * 3;
          const low = price - Math.random() * 3;
          const weekHigh = base + 30;
          const weekLow = base - 30;

          return {
            symbol,
            name: {
              AAPL: 'Apple',
              GOOGL: 'Alphabet',
              MSFT: 'Microsoft',
              TSLA: 'Tesla'
            }[symbol],
            price,
            high,
            low,
            weekHigh,
            weekLow
          };
        })
      )
    );
  }
}