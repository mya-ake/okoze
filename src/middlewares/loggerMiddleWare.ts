import express = require('express');
import consola from 'consola';
import { join } from 'path';

export const buildLoggerMiddleware = ({ baseURL }: { baseURL: string }) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { method, url } = req;
    consola.info(`${method} ${join(baseURL, url)}`);
    next();
  };
};
