const express = require('express');
import * as expressTypes from 'express';
import consola from 'consola';
import axios from 'axios';
import { join } from 'path';

import { wrightFile, existPathname, readFile } from './lib/file';
import { OkozeResponse } from 'src/types';

export const app = express();
const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';
const originPort = `:${process.env.OKOZE_ORIGIN_PORT}`;
const originHost = process.env.OKOZE_ORIGIN_HOST || 'localhost';

const baseURL = `http://${originHost}${originPort}`;
const request = axios.create({
  baseURL,
  adapter: require('axios/lib/adapters/http'),
});

const snapshotDir = join(process.cwd(), '__snapshots__');

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

app.all('*', async (req: expressTypes.Request, res: expressTypes.Response) => {
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
    'Cache-Control': 'no-store',
  });
  res.json(data);
});

// testApp.listen(Number(port), host, () => {
//   consola.ready({
//     message: `Okoze listening on http://${host}:${port}`,
//     badge: true,
//   });
// });
