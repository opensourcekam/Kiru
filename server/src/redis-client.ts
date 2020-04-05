import * as IORedis from 'ioredis';
import { isProduction } from './constants';
const { REDIS_URL, REDIS_PASSWORD } = process.env;

export const redis = new IORedis({
	password: isProduction ? REDIS_PASSWORD : undefined,
	host: isProduction ? REDIS_URL : '0.0.0.0',
	port: 6379
});
