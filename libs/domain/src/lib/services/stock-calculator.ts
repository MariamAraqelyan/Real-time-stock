import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StockCalculator {
  calculateChange(oldPrice: number, newPrice: number): number {
    return newPrice - oldPrice;
  }
}
