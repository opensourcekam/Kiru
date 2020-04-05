import * as types from './types';
import { userSessionIdPrefix, redisSessionPrefix } from './constants';

export const isProduction = process.env.NODE_ENV != 'DEV';

export const getUserId = (ctx: types.Context): string => {
	const { userId } = ctx.session;
	if (userId) {
		return userId;
	}
};

export class AuthError extends Error {
	constructor() {
		super('Not authorized');
	}
}

export const removeAllUsersSessions = async (userId: string, redis: any) => {
	const sessionIds = await redis.lrange(`${userSessionIdPrefix}${userId}`, 0, -1);

	const promises = [];

	for (let i = 0; i < sessionIds.length; i += 1) {
		promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
	}
	await Promise.all(promises);
};
