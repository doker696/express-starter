import redis from 'redis';

/**
 * Create redis client instance
 */
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASS,

});

redisClient.on('connect', () => {
  // Successfully connected to redis!
});

redisClient.on('error', (err) => {
  // TODO: There is an error caused by redis. Send it to monitoring tool!!
  // eslint-disable-next-line no-console
  console.log('Redis error', err);
});

export default redisClient;
