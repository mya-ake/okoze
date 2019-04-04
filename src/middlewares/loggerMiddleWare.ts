import express = require('express');
import consola from 'consola';

export const buildLoggerMiddleware = ({ baseURL }: { baseURL: string }) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { method, url } = req;
    consola.info(`${method} ${baseURL}${url}`);
    next();
  };
};
