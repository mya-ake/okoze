import express = require('express');
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { join } from 'path';
import objectHash from 'object-hash';
import consola from 'consola';
import { wrightFile, existPathname, readFile } from './../lib/file';
import { OkozeOptions, OkozeResponse } from 'src/types';

const createSnapshotPathname = ({
  method,
  url,
}: {
  method: string;
  url: string;
}) => {
  const hash = objectHash({
    method,
    url,
  });
  return `${hash}.json`;
};

const readSnapshot = async ({
  snapshotPathname,
}: {
  snapshotPathname: string;
}): Promise<OkozeResponse> => {
  const { status, data, headers } = await readFile(snapshotPathname);
  return { status, data, headers };
};

const buildRequestOrigin = (request: AxiosInstance) => {
  return async (
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
    )
      .then(response => {
        if (process.env.OKOZE_DEBUG === 'true') {
          consola.info(response);
        }
        return response;
      })
      .catch(err => {
        if (process.env.OKOZE_DEBUG === 'true') {
          consola.info(err);
        }
        return err.response || {};
      });

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
};

export const buildProcessor = (options: OkozeOptions) => {
  const { origin: baseURL, snapshotDir } = options;
  const request = axios.create({
    baseURL,
    adapter: require('axios/lib/adapters/http'),
  });

  const requestOrigin = buildRequestOrigin(request);

  return async (req: express.Request, res: express.Response) => {
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
  };
};
