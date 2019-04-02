import axios from 'axios';
import { createServer, Server } from 'http';
import { app } from 'src/index';
import { app as originApp } from './../fixtures/server';

const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';
const originPort = process.env.OKOZE_ORIGIN_PORT;
const originHost = process.env.OKOZE_ORIGIN_HOST || 'localhost';

const request = axios.create({
  baseURL: `http://${host}:${port}`,
});

let server: Server;
let originServer: Server;
beforeAll(() => {
  server = createServer(app).listen(port, host);
  // @ts-ignore
  originServer = createServer(originApp).listen(originPort, originHost);
});
afterAll(() => {
  server.close();
  originServer.close();
});

describe('e2e tests', () => {
  it('success', async () => {
    expect.assertions(2);
    const { status, data } = await request.get('/users').catch(err => {
      // console.log(err);
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
  });
});
