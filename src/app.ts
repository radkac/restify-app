import * as restify from 'restify';
import * as validator from 'restify-joi-validator';
import { routes } from './routes';
import { cors } from './server/cors';
import { jwtMiddleware } from './server/jwtMiddleware';

const exclusions = ['/authenticate'];

export const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(jwtMiddleware({ exclusions }));
server.use(validator());

routes(server);
