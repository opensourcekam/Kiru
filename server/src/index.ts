require('dotenv-safe').config();
import * as allTypes from './resolvers';
import * as connectRedis from 'connect-redis';
import { static as expressStatic } from 'express';
import { join } from 'path';
import * as session from 'express-session';
import datamodelInfo from './generated/nexus-prisma';
import { GraphQLServer } from 'graphql-yoga';
import { makePrismaSchema } from 'nexus-prisma';
import * as RateLimit from 'express-rate-limit';
import * as RateLimitRedisStore from 'rate-limit-redis';
import * as helmet from 'helmet';
import { permissions } from './permissions';
import { prisma } from './generated/prisma-client';
import { redis } from './redis-client';
import { redisSessionPrefix, isProduction } from './constants';
const { SESSION_SECRET, FRONTEND_HOST, SERVER_HOST } = process.env;

const RedisStore = connectRedis(session);
const schema = makePrismaSchema({
	types: allTypes,
	prisma: {
		datamodelInfo,
		client: prisma
	},
	outputs: {
		schema: join(__dirname, './generated/schema.graphql'),
		typegen: join(__dirname, './generated/nexus.ts')
	},
	nonNullDefaults: {
		input: false,
		output: false
	},
	typegenAutoConfig: {
		sources: [
			{
				source: join(__dirname, './types.ts'),
				alias: 'types'
			}
		],
		contextType: 'types.Context'
	}
});

const server = new GraphQLServer({
	schema,
	middlewares: [ permissions ],
	context: ({ request, response }) => ({
		req: request,
		res: response,
		url: request ? request.protocol + '://' + request.get('host') : '',
		session: request ? request.session : {},
		prisma,
		redis
	})
});

server.express.use(
	session({
		store: new RedisStore({
			client: redis as any,
			prefix: redisSessionPrefix
		}),
		name: 'qid',
		secret: SESSION_SECRET,
		resave: false,
		proxy: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: isProduction,
			maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
		}
	})
);

server.express.use(helmet());

server.express.use(
	new RateLimit({
		store: new RateLimitRedisStore({
			client: redis as any
		}),
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100 // limit each IP to 100 requests per windowMs
	})
);

const options = {
	port: 4444,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground',
	cors: {
		origin: [ FRONTEND_HOST, SERVER_HOST, /http:\/\/localhost:+?/ ],
		credentials: true
	}
};

// Serve the static files from the React app
server.express.use('/', expressStatic(join(__dirname, '../../client/build')));

// Handles any requests that don't match the ones above
// https://github.com/prisma-labs/graphql-yoga/issues/9#issuecomment-456928873
server.express.get('*', (req, res, next) => {
	// Handle graphql-yoga specific routes
	if (req.url == options.playground || req.url == options.subscriptions || req.url == options.endpoint) {
		// Return next() so that the GraphQLServer will handle it
		return next();
	}
	//
	res.sendFile(join(__dirname, '../../client/build/index.html'));
});

server.start(options, () => console.log(`🚀 Server ready at ${SERVER_HOST}`));
