import { TestBed } from '@angular/core/testing';
import { StockCalculator } from './stock-calculator';
import { describe, it, expect, beforeEach } from 'vitest';

describe('StockCalculator', () => {
  let service: StockCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockCalculator],
    });
    service = TestBed.inject(StockCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateChange', () => {
    it('should return a positive difference when the price increases', () => {
      const oldPrice = 100;
      const newPrice = 105.5;
      
      const result = service.calculateChange(oldPrice, newPrice);
      
      expect(result).toBe(5.5);
    });

    it('should return a negative difference when the price decreases', () => {
      const oldPrice = 200;
      const newPrice = 150;
      
      const result = service.calculateChange(oldPrice, newPrice);
      
      expect(result).toBe(-50);
    });

    it('should return zero when the price remains the same', () => {
      const price = 123.45;
      
      const result = service.calculateChange(price, price);
      
      expect(result).toBe(0);
    });

    it('should handle floating point numbers accurately', () => {
      // In JS, 0.3 - 0.1 is 0.19999999999999998
      const oldPrice = 0.1;
      const newPrice = 0.3;
      
      const result = service.calculateChange(oldPrice, newPrice);
      
      // toBeCloseTo is essential for financial/stock math
      expect(result).toBeCloseTo(0.2);
    });
  });
});