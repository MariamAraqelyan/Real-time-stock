import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Stock } from '@real-time-stock/application';
import { StockCardComponent } from '../stock-card/stock-card';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-stock-dashboard',
  standalone: true,
  imports: [StockCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  readonly stocks = toSignal(this.service.getStocks(), { initialValue: [] });

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
}