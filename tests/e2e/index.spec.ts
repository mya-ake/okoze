import axios from 'axios';
import { createServer, Server } from 'http';
const rimraf = require('rimraf');

import { app } from 'src/index';
import { app as originApp } from './../fixtures/server';
import { buildOption } from 'src/lib/builders';

const { port, host, originPort, originHost, snapshotDir } = buildOption();

const request = axios.create({
  baseURL: `http://${host}:${port}`,
});

const removeSnapshots = () => {
  return new Promise((resolve, reject) => {
    rimraf(snapshotDir, (err: any) => {
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
  okozeServer = createServer(app).listen(port, host);
  // @ts-ignore
  originServer = createServer(originApp).listen(originPort, originHost);
});
afterAll(async () => {
  okozeServer.close();
  originServer.close();
  await removeSnapshots();
});

const isNode = process.env.TEST_TARGET === 'node';
describe('e2e tests', () => {
  describe('simple', () => {
    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await request
        .get('/users')
        .catch(err => {
          return err.response;
        });

      expect(status).toBe(200);
      expect(data).toEqual({
        users: [
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
        ],
      });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await request
        .get('/users')
        .catch(err => {
          return err.response;
        });

      expect(status).toBe(200);
      expect(data).toEqual({
        users: [
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
          },
        ],
      });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });
});
