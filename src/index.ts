import express = require('express');
import bodyParser = require('body-parser');
import axios, { AxiosRequestConfig } from 'axios';
import { join } from 'path';

import { wrightFile, existPathname, readFile } from './lib/file';
import { buildOption } from './lib/builders';
import { buildLoggerMiddleware } from './middlewares/loggerMiddleWare';
import { OkozeResponse } from './types';

export const app = express();
const {
  port,
  host,
  originPort,
  originHost,
  baseURL,
  snapshotDir,
} = buildOption();

const request = axios.create({
  baseURL,
  adapter: require('axios/lib/adapters/http'),
});

const createSnapshotPathname = ({
  method,
  url,
}: {
  method: string;
  url: string;
}) => {
  return `${method}:${url}.json`;
};

const requestOrigin = async (
  { snapshotPathname }: { snapshotPathname: string },
  {
    method,
    url,
    headers,
    body,
  }: { method: string; url: string; headers: any; body: any },
): Promise<OkozeResponse> => {
  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers: {
      ...headers,
    },
  };

  const { status, data, headers: responseHeaders } = await request(
    axiosConfig,
  ).catch(err => err.response || {});

  await wrightFile(snapshotPathname, {
    status,
    data,
    headers: responseHeaders,
  });

  return {
    status,
    data,
    headers: responseHeaders,
  };
};

const readSnapshot = async ({
  snapshotPathname,
}: {
  snapshotPathname: string;
}): Promise<OkozeResponse> => {
  const { status, data, headers } = await readFile(snapshotPathname);
  return { status, data, headers };
};

app.use(bodyParser.json());
if (process.env.DEBUG === 'true') {
  app.use(buildLoggerMiddleware({ baseURL }));
}

app.all('*', async (req: express.Request, res: express.Response) => {
  const snapshotFilename = createSnapshotPathname(req);
  const snapshotPathname = join(snapshotDir, snapshotFilename);

  const existSnapshot = await existPathname(snapshotPathname);

  const { status, data, headers } = existSnapshot
    ? await readSnapshot({ snapshotPathname })
    : await requestOrigin({ snapshotPathname }, req);

  res.status(status);
  res.set({
    ...headers,
    'cache-control': 'no-store',
    'x-okoze-snapshot': existSnapshot ? 'used' : 'update',
  });
  res.json(data);
});

// testApp.listen(Number(port), host, () => {
//   consola.ready({
//     message: `Okoze listening on http://${host}:${port}`,
//     badge: true,
//   });
// });
