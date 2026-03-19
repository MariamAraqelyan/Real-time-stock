import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockDashboardComponent } from '@real-time-stock/ui';

@Component({
  selector: 'app-root',
  imports: [StockDashboardComponent],
  template: `<ui-stock-dashboard/>`,
  styleUrl: './app.scss'
})
export class App {}
