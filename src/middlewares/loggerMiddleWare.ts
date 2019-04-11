import express = require('express');
import { join } from 'path';

export const buildLoggerMiddleware = ({ baseURL }: { baseURL: string }) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { method, url } = req;
    console.log('[okoze]', `${method} ${join(baseURL, url)}`);
    next();
  };
};
