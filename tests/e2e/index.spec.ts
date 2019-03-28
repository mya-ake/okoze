import axios from 'axios';
import { createServer, Server } from 'http';
import { app } from 'src/index';

const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';
const request = axios.create({
  baseURL: `http://${host}:${port}`,
});

let server: Server;
beforeAll(() => {
  server = createServer(app).listen(port, host);
});
afterAll(() => {
  server.close();
});

describe('e2e tests', () => {
  it('success', async () => {
    expect.assertions(2);
    const { status, data } = await request.get('/');
    expect(status).toBe(200);
    expect(data).toEqual({ message: 'test' });
  });
});
