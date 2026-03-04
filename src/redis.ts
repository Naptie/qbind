import { createClient } from 'redis';
import config from '../config.json' with { type: 'json' };

class Redis {
  public client;

  constructor() {
    this.client = createClient({
      url: config.redisUrl,
      socket: {
        reconnectStrategy: (retries: number) => {
          const delays = [
            10000, // 10s
            30000, // 30s
            30000, // 30s
            60000, // 1min
            60000, // 1min
            300000, // 5min
            600000, // 10min
            1800000 // 30min
          ];
          const delay = retries < delays.length ? delays[retries] : delays[delays.length - 1];
          console.log(`[Redis] Connection lost. Reconnecting in ${delay / 1000}s...`);
          return delay;
        }
      }
    });

    this.client.on('error', (err) => {
      console.error('[Redis] Client error:', err);
    });

    this.client
      .connect()
      .then(() => {
        console.log('[Redis] Connected.');
      })
      .catch((err) => {
        console.error('[Redis] Connection error:', err);
      });
  }

  disconnect() {
    this.client.destroy();
    console.log('[Redis] Disconnected.');
  }
}

const redis = new Redis();
const { client, disconnect } = redis;
export { client as redis, disconnect };
export default redis;
