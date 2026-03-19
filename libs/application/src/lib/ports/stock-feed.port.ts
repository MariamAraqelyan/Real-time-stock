import { Observable } from 'rxjs';
import { Stock } from '@real-time-stock/domain';


export abstract class StockFeedPort {
  abstract getPrices(): Observable<Stock[]>;
}
