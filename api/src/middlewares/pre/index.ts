import CrossOriginHeadersMiddleware from './cors';
import RequestDataJsonParserMiddleware from './bodyParser';

export default [
  CrossOriginHeadersMiddleware(`${process.env.CLIENT_ADDRESS}`),
  RequestDataJsonParserMiddleware(),
];
