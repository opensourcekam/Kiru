import * as IORedis from 'ioredis';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as rateLimit from 'express-rate-limit';
import * as RateLimitRedisStore from 'rate-limit-redis';

import { redisSessionPrefix, isProduction } from '../constants';
const { SESSION_SECRET, REDIS_URL, REDIS_PASSWORD } = process.env;

export const redis = new IORedis({
	password: isProduction ? REDIS_PASSWORD : undefined,
	host: isProduction ? REDIS_URL : '0.0.0.0',
	port: 6379
});

const RedisStore = connectRedis(session);

export const redisSession = session({
	store: new RedisStore({
		client: redis as any,
		prefix: redisSessionPrefix
	}),
	name: 'qid',
	secret: SESSION_SECRET!,
	resave: false,
	proxy: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		secure: isProduction,
		maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
	}
});

export const redisRateLimit = rateLimit({
	store: new RateLimitRedisStore({
		client: redis as any
	}),
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});
