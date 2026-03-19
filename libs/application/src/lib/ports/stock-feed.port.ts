import { Observable } from 'rxjs';
import { StockInter } from '@real-time-stock/domain';


export abstract class StockFeedPort {
  abstract getPrices(): Observable<StockInter[]>;
}
