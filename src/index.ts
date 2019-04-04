import express = require('express');
import consola from 'consola';
import axios from 'axios';
import { join } from 'path';

import { wrightFile, existPathname, readFile } from './lib/file';
import { buildOption } from './lib/builders';
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

const createSnapshotPathname = ({ url }: { url: string }) => {
  return `${url}.json`;
};

const requestOrigin = async (
  { snapshotPathname }: { snapshotPathname: string },
  { method, url, headers }: { method: string; url: string; headers: any },
): Promise<OkozeResponse> => {
  const axiosConfig = {
    method,
    url,
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

app.all('*', async (req: express.Request, res: express.Response) => {
  const { method, url } = req;
  consola.info(`${method} ${baseURL}${url}`);

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
