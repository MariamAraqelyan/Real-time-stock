import { Component, effect, inject, signal } from '@angular/core';
import { Stock } from '@real-time-stock/application';
import { StockInter } from '@real-time-stock/domain';
import { StockCardComponent } from '../stock-card/stock-card';

@Component({
  selector: 'ui-stock-dashboard',
  standalone: true,
  imports: [StockCardComponent],
  template: `
    <div class="grid">
      @for(stock of stocks(); track stock.symbol) {
        <ui-stock-card
        [stock]="stock"
        [enabledInput]="enabled()[stock.symbol]"
        (enabledChange)="onToggle(stock.symbol, $event)"/>
      }
    </div>
  `,
  styleUrls: ['./stock-dashboard.scss']
})
export class StockDashboardComponent {
  private service = inject(Stock);

  stocks = signal<StockInter[]>([]);

  enabled = signal<Record<string, boolean>>({
    AAPL: true,
    GOOGL: true,
    MSFT: true,
    TSLA: true
  });

  onToggle(symbol: string, value: boolean) {
    this.enabled.update(state => ({
      ...state,
      [symbol]: value
    }))
  }

  constructor() {
    effect(() => {
      this.service.getStocks().subscribe(data => {
        this.stocks.set(data);
      })
    })
  }
}