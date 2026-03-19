import { Component } from '@angular/core';
import { StockDashboardComponent } from '@real-time-stock/ui';

@Component({
  selector: 'app-root',
  imports: [StockDashboardComponent],
  template: `<ui-stock-dashboard/>`,
  styleUrl: './app.scss'
})
export class App {}
