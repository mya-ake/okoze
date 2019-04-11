import { createServer, Server } from 'http';
import { join } from 'path';
import { OkozeApp } from 'src/core';
import { buildApp as buildOriginApp } from './../server';
const rimraf = require('rimraf');

const port = 3000;
const host = 'localhost';
const originPort = 3080;
const originHost = 'localhost';
const origin = `http://${originHost}:${originPort}`;

export const requestMockFunc = jest.fn();
const originApp = buildOriginApp(requestMockFunc);

export const buildEnvOptions = () => {
  return {
    port,
    host,
    origin,
  };
};

export const setupCommonProcessing = (app: OkozeApp) => {
  const removeSnapshots = () => {
    return new Promise((resolve, reject) => {
      rimraf(app.snapshotDir, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  let okozeServer: Server;
  let originServer: Server;
  beforeAll(() => {
    okozeServer = createServer(app.server).listen(app.port, app.host);
    // @ts-ignore
    originServer = createServer(originApp).listen(originPort, originHost);
  });
  afterAll(async () => {
    okozeServer.close();
    originServer.close();
    await removeSnapshots();
  });
  beforeEach(() => {
    requestMockFunc.mockClear();
  });
};
