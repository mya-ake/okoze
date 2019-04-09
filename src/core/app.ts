import express = require('express');
import bodyParser = require('body-parser');

import { buildProcessor } from './processor';
import { buildLoggerMiddleware } from './../middlewares/loggerMiddleWare';
import { OkozeOptions } from 'src/types';

const buildApp = (options: OkozeOptions) => {
  const app = express();
  const { origin: baseURL } = options;

  app.use(bodyParser.json());
  if (process.env.DEBUG === 'true') {
    app.use(buildLoggerMiddleware({ baseURL }));
  }

  app.all('*', buildProcessor(options));

  return app;
};

export class OkozeApp {
  private app: express.Application;
  private options: OkozeOptions;
  constructor(options: OkozeOptions) {
    this.app = buildApp(options);
    this.options = options;
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

  listen() {
    this.app.listen(this.options.port, this.options.host);
  }
}
