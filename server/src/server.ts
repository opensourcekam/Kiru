require('dotenv-safe').config();
import { GraphQLServer } from 'graphql-yoga';

import { permissions } from './permissions';
import { schema } from './schema';
import { createContext } from './context';
import { redisSession, redisRateLimit } from './services/redis';
import { serveClientBuild, directAllTraffic, secureWithHeaders, serverOptions } from './services/express';

const server = new GraphQLServer({
	schema,
	context: createContext,
	middlewares: [ permissions ]
});

server.express.use(redisSession);
server.express.use(redisRateLimit);
server.express.use(secureWithHeaders);
server.express.use('/', serveClientBuild);
server.express.get('*', directAllTraffic);

server.start(serverOptions, () => console.log(`🚀 Server ready at: http://localhost:4000\n`));
