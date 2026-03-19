import { Injectable } from '@angular/core';
import { StockFeedPort } from '@real-time-stock/application'
import { Stock } from '@real-time-stock/domain';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class StockFeedAdapter implements StockFeedPort {
    private socket = webSocket<Stock[]>("ws://localhost:8080");

    getPrices(): Observable<Stock[]> {
        return this.socket.asObservable();
    }
}
