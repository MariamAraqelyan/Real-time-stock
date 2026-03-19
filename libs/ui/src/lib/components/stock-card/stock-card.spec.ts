import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockCardComponent } from './stock-card.component';
import { Stock } from '@real-time-stock/domain';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;

  const initialStock: Stock = { 
    symbol: 'AAPL', name: 'Apple', price: 150, 
    high: 155, low: 148, weekHigh: 180, weekLow: 120 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockCardComponent);
    component = fixture.componentInstance;
    
    // Set required input before first change detection
    fixture.componentRef.setInput('stock', initialStock);
    fixture.detectChanges();
  });

  it('should initialize with direction "none"', () => {
    expect(component.direction()).toBe('none');
  });

  describe('Price Direction Logic (Effect)', () => {
    it('should set direction to "up" when price increases', async () => {
      fixture.componentRef.setInput('stock', { ...initialStock, price: 160 });
      
      fixture.detectChanges();
      
      expect(component.direction()).toBe('up');
    });

    it('should set direction to "down" when price decreases', () => {
      fixture.componentRef.setInput('stock', { ...initialStock, price: 140 });
      fixture.detectChanges();
      
      expect(component.direction()).toBe('down');
    });

    it('should reset to "none" and clear lastPrice when disabled', () => {
      fixture.componentRef.setInput('stock', { ...initialStock, price: 160 });
      fixture.detectChanges();
      expect(component.direction()).toBe('up');

      component.enabled.set(false);
      fixture.detectChanges();

      expect(component.direction()).toBe('none');
    });
  });

  describe('Toggle Functionality', () => {
    it('should toggle the enabled state and emit change', () => {
      const outputSpy = vi.spyOn(component.enabledChange, 'emit');
      
      component.toggle();
      
      expect(component.enabled()).toBe(false);
      expect(outputSpy).toHaveBeenCalledWith(false);
    });

    it('should stop event propagation if event is provided', () => {
      const mockEvent = { stopPropagation: vi.fn() } as unknown as MouseEvent;
      
      component.toggle(mockEvent);
      
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });
  });
});