import { Redis } from 'ioredis';
import { Store } from 'express-session';
import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';

import { prisma } from './services/prisma';
import { redis } from './services/redis';

interface IUserSession {
	userId: string;
}

export interface Context {
	req: ContextParameters['request'];
	res: ContextParameters['response'];
	connection: ContextParameters['connection'];
	fragmentReplacements: ContextParameters['fragmentReplacements'];
	url: string;
	session: any;
	prisma: PrismaClient;
	redis: Redis;
}

export function createContext(ctx: ContextParameters) {
	const { request, response } = ctx;

	return {
		req: request,
		res: response,
		url: request ? request.protocol + '://' + request.get('host') : '',
		session: request ? request.session : {},
		prisma,
		redis,
		...ctx
	};
}
