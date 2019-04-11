import express = require('express');
import bodyParser = require('body-parser');
import consola from 'consola';

import { buildProcessor } from './processor';
import { buildLoggerMiddleware } from './../middlewares/loggerMiddleWare';
import { OkozeOptions } from 'src/types';
const rimraf = require('rimraf');

const buildApp = (options: OkozeOptions) => {
  const app = express();
  const { origin: baseURL } = options;

  app.use(bodyParser.json());
  if (process.env.OKOZE_DEBUG === 'true') {
    app.use(buildLoggerMiddleware({ baseURL }));
  }

  app.all('*', buildProcessor(options));

  return app;
};

export class OkozeApp {
  private app: express.Application;
  private options: OkozeOptions;

  constructor(options: OkozeOptions) {
    this.options = options;
    this.checkRequireOptions();
    this.app = buildApp(options);
  }

  get server() {
    return this.app;
  }

  get snapshotDir() {
    return this.options.snapshotDir;
  }

  get port() {
    return this.options.port;
  }

  get host() {
    return this.options.host;
  }

  private checkRequireOptions() {
    try {
      if (typeof this.options.origin !== 'string') {
        throw 'Require origin option! e.g. `okoze --origin https://examplec.com`';
      }
    } catch (message) {
      consola.error(message);
      process.exit(1);
    }
  }

  listen() {
    this.app.listen(this.port, this.host, () => {
      consola.ready(`Okoze listening on: http://${this.host}:${this.port}`);
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      rimraf(this.snapshotDir, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
