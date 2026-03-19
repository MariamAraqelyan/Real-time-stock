
import { DecimalPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, OnChanges } from '@angular/core';
import { StockInter } from '@real-time-stock/domain';

@Component({
  selector: 'ui-stock-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './stock-card.html',
  styleUrl: './stock-card.scss',
})
export class StockCardComponent implements OnChanges {
  @Input() stock!: StockInter;
  @Input() set enabledInput(value: boolean) {
    this.enabled.set(value);
  }
  @Output() enabledChange = new EventEmitter<boolean>();

  private lastPrice = signal<number | null>(null);
  enabled = signal(true);

  direction = signal<'up' | 'down' | 'none'>('none');

  ngOnChanges() {
    if (!this.enabled()) {
      this.direction.set('none');
      return;
    }

    const current = this.stock.price;
    const last = this.lastPrice();

    if (last !== null && current !== last) {
      this.direction.set(current > last ? 'up' : 'down');
    } else {
      this.direction.set('none');
    }

    this.lastPrice.set(current);
  }

  toggle(event: MouseEvent) {
    this.enabled.update(v => !v);
    this.enabledChange.emit(this.enabled());
    
    if (!this.enabled()) {
      this.direction.set('none');
    }
  }
}

