import axios from 'axios';
import { join } from 'path';

import { OkozeApp } from 'src/core';
import { setupCommonProcessing, buildEnvOptions } from '../fixtures/setup';

const app = new OkozeApp({
  update: true,
  ...buildEnvOptions(),
  snapshotDir: join(process.cwd(), 'tests', 'e2e', '__snapshots__', 'update'),
});

const request = axios.create({
  baseURL: `http://${app.host}:${app.port}`,
});

setupCommonProcessing(app);

const isNode = process.env.TEST_TARGET === 'node';

describe('e2e tests, update', () => {
  if (isNode === false) {
    it.skip('', () => {});
    return;
  }

  it('all requests is update', async () => {
    const { headers: headers1 } = await request.get('/users').catch(err => {
      return err.response;
    });
    const { headers: headers2 } = await request.get('/users').catch(err => {
      return err.response;
    });
    expect(headers1['x-okoze-snapshot']).toBe('update');
    expect(headers2['x-okoze-snapshot']).toBe('update');
  });
});
