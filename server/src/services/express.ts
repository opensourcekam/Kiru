import * as helmet from 'helmet';
import { join } from 'path';
import { static as expressStatic, Request, Response, NextFunction } from 'express';

export const serverOptions = {
	port: 3333,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground',
	cors: {
		origin: [ process.env.FRONTEND_HOST!, process.env.SERVER_HOST!, /http:\/\/localhost:+?/ ],
		credentials: true
	}
};

export const serveClientBuild = expressStatic(join(__dirname, '../../../client/build'));
export const directAllTraffic = (req: Request, res: Response, next: NextFunction) => {
	// Handle graphql-yoga specific routes
	if (
		req.url == serverOptions.playground ||
		req.url == serverOptions.subscriptions ||
		req.url == serverOptions.endpoint
	) {
		// Return next() so that the GraphQLServer will handle it
		return next();
	}
	//
	res.sendFile(join(__dirname, '../../../client/build/index.html'));
};

export const secureWithHeaders = helmet();
