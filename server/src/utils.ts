import { Context } from './context';
import { userSessionIdPrefix, redisSessionPrefix } from './constants/index';

export const getUserId = (ctx: Context): string | undefined => {
	const { userId } = ctx.session;

	if (userId) {
		return userId;
	}
};

export const removeAllUsersSessions = async (userId: string, redis: any) => {
	const sessionIds = await redis.lrange(`${userSessionIdPrefix}${userId}`, 0, -1);

	const promises = [];

	for (let i = 0; i < sessionIds.length; i += 1) {
		promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
	}
	await Promise.all(promises);
};
