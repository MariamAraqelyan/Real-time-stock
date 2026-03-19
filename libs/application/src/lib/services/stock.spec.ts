import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { StockService } from './stock.service';
import { StockFeedPort } from '../ports/stock-feed.port';
import { Stock } from '@real-time-stock/domain';

describe('StockService', () => {
  let service: StockService;
  let mockFeedPort: any;

  const mockStocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple', price: 150, high: 155, low: 148, weekHigh: 180, weekLow: 120 },
    { symbol: 'GOOGL', name: 'Google', price: 2800, high: 2850, low: 2780, weekHigh: 3000, weekLow: 2500 }
  ];

  beforeEach(() => {
    mockFeedPort = {
      getPrices: vi.fn(() => of(mockStocks))
    };

    TestBed.configureTestingModule({
      providers: [
        StockService,
        { provide: StockFeedPort, useValue: mockFeedPort }
      ]
    });

    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStocks', () => {
    it('should call getPrices from the FeedPort and return stock data', (done) => {
      service.getStocks().subscribe((stocks) => {
        expect(stocks).toEqual(mockStocks);
        expect(stocks.length).toBe(2);
        
        expect(mockFeedPort.getPrices).toHaveBeenCalledTimes(1);
        
        done();
      });
    });

    it('should handle empty stock lists', (done) => {
      mockFeedPort.getPrices.mockReturnValue(of([]));

      service.getStocks().subscribe((stocks) => {
        expect(stocks).toEqual([]);
        done();
      });
    });
  });
});