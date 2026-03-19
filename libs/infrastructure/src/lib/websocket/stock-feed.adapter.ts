import { Injectable } from '@angular/core';
import { StockFeedPort } from '@real-time-stock/application'
import { StockInter } from '@real-time-stock/domain';
import { map, Observable, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class StockFeedAdapter implements StockFeedPort {
    private socket = webSocket<StockInter[]>("ws://localhost:8080");

    getPrices(): Observable<StockInter[]> {
        return this.socket.asObservable();
    }
}
