
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

function randomPrice(base) {
  return +(base + (Math.random() - 0.5) * 2).toFixed(2);
}

function createStock(symbol) {
  const base = {
    AAPL: 190,
    GOOGL: 140,
    MSFT: 400,
    TSLA: 200
  }[symbol];

  const price = randomPrice(base);
  const high = price + Math.random() * 3;
  const low = price - Math.random() * 3;
  const weekHigh = base + 30;
  const weekLow = base - 30;

  return {
    symbol,
    name: {
      AAPL: 'Apple',
      GOOGL: 'Alphabet',
      MSFT: 'Microsoft',
      TSLA: 'Tesla'
    }[symbol],
    price,
    high,
    low,
    weekHigh,
    weekLow
  };
}

wss.on('connection', ws => {
  const interval = setInterval(() => {
    const payload = STOCKS.map(createStock);
    ws.send(JSON.stringify(payload));
  }, 2000);

  ws.on('close', () => clearInterval(interval));
});

console.log('WS server running on ws://localhost:8080');