import CrossOriginHeadersMiddleware from '../pre/cors/index';
import RequestDataJsonParserMiddleware from './bodyParser';

export default [
  CrossOriginHeadersMiddleware(`${process.env.CLIENT_ADDRESS}`),
  RequestDataJsonParserMiddleware(),
];
