import { TestBed } from '@angular/core/testing';

import { StockCalculator } from './stock-calculator';

describe('StockCalculator', () => {
  let service: StockCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
