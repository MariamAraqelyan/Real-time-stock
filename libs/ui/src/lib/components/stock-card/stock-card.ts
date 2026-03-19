import { Component, signal, input, model, output, effect, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StockInter } from '@real-time-stock/domain';

@Component({
  selector: 'ui-stock-card',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stock-card.html',
  styleUrl: './stock-card.scss',
})
export class StockCardComponent {
  stock = input.required<StockInter>();
  enabled = model(true, { alias: 'enabledInput' });
  enabledChange = output<boolean>();
  direction = signal<'up' | 'down' | 'none'>('none');
  private lastPrice: number | null = null;

  constructor() {
    effect(() => {
      const currentPrice = this.stock().price;
      const isEnabled = this.enabled();

      if (!isEnabled) {
        this.direction.set('none');
        this.lastPrice = null; 
        return;
      }

      if (this.lastPrice !== null && currentPrice !== this.lastPrice) {
        this.direction.set(currentPrice > this.lastPrice ? 'up' : 'down');
      } else {
        this.direction.set('none');
      }

      // Update memory for the next WebSocket push
      this.lastPrice = currentPrice;
    });
  }

  toggle(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.enabled.update(v => !v);
    this.enabledChange.emit(this.enabled());
  }
}