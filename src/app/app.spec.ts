import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { StockFeedPort } from '@real-time-stock/application';
import { of } from 'rxjs';
import { vi } from 'vitest'; // Add this import

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockStockFeedPort = {
      getPrices: vi.fn(() => of([])),
      getStockStream: vi.fn(() => of([]))
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: StockFeedPort,
          useValue: mockStockFeedPort
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});