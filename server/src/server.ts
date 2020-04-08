require('dotenv-safe').config();
import { GraphQLServer } from 'graphql-yoga';
import * as morgan from 'morgan';

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

server.express.use(morgan('tiny'));
server.express.use(redisSession);
server.express.use(redisRateLimit);
server.express.use(secureWithHeaders);
server.express.use('/', serveClientBuild);
server.express.get('*', directAllTraffic);

server.express.listen(serverOptions.port, '0.0.0.0');
server.start(serverOptions, (s) => console.log(`🚀 Server ready`, JSON.stringify(s, null, 4)));
