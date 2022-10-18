import {Request, Response, NextFunction} from "express";

export default function (url:String) {
    return [ (req:Request, res:Response, next:NextFunction) => {
        res.set('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'url');

        return next();
    } ];
}