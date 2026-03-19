import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockDashboardComponent } from './stock-dashboard.component';
import { StockService } from '../../services/stock.service';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Stock } from '@real-time-stock/domain';

describe('StockDashboardComponent', () => {
  let component: StockDashboardComponent;
  let fixture: ComponentFixture<StockDashboardComponent>;
  let mockStockService: any;

  const mockStocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple', price: 150, high: 155, low: 148, weekHigh: 180, weekLow: 120 },
    { symbol: 'TSLA', name: 'Tesla', price: 700, high: 710, low: 690, weekHigh: 900, weekLow: 600 }
  ];

  beforeEach(async () => {
    mockStockService = {
      getStocks: vi.fn(() => of(mockStocks))
    };

    await TestBed.configureTestingModule({
      imports: [StockDashboardComponent],
      providers: [
        { provide: StockService, useValue: mockStockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StockDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Stocks Signal', () => {
    it('should initialize stocks signal with data from the service', () => {
      const currentStocks = component.stocks();
      
      expect(currentStocks).toEqual(mockStocks);
      expect(mockStockService.getStocks).toHaveBeenCalled();
    });
  });

  describe('onToggle', () => {
    it('should update the enabled signal when a stock is toggled', () => {
      component.onToggle('AAPL', false);

      const state = component.enabled();
      expect(state['AAPL']).toBe(false);
      
      expect(state['GOOGL']).toBe(true);
    });

    it('should add a new symbol to the enabled record if it does not exist', () => {
      component.onToggle('NVDA', true);
      
      expect(component.enabled()['NVDA']).toBe(true);
    });
  });
});