import CrossOriginHeadersMiddleware from './cors';
import RequestDataJsonParserMiddleware from './bodyParser';

export default [CrossOriginHeadersMiddleware(), RequestDataJsonParserMiddleware()];
