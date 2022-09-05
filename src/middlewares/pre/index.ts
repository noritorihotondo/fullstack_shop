import CrossOriginHeadersMiddleware from "../pre/cors/index";
import RequestDataJsonParserMiddleware from "./bodyParser";

export default [
    CrossOriginHeadersMiddleware('https://localhost:3000'),
    RequestDataJsonParserMiddleware()
];