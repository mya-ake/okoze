import axios from 'axios';
import { join } from 'path';

import { OkozeApp } from 'src/core';
import { setupCommonProcessing, buildEnvOptions } from '../fixtures/setup';

const app = new OkozeApp({
  update: false,
  ...buildEnvOptions(),
  snapshotDir: join(process.cwd(), 'tests', 'e2e', '__snapshots__'),
});

const request = axios.create({
  baseURL: `http://${app.host}:${app.port}`,
});

setupCommonProcessing(app);

const isNode = process.env.TEST_TARGET === 'node';
describe('e2e tests, core', () => {
  describe('get', () => {
    const requestUsers = () => {
      return request.get('/users').catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(200);
      expect(data).toEqual({
        users: [
          {
            id: expect.any(Number),
            name: expect.any(String),
            role: 'general',
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
            role: 'general',
          },
          {
            id: expect.any(Number),
            name: expect.any(String),
            role: 'admin',
          },
        ],
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('get, with query', () => {
    const requestUsers = () => {
      return request
        .get('/users', { params: { filter: 'role:admin' } })
        .catch(err => {
          return err.response;
        });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(200);
      expect(data).toEqual({
        users: [
          {
            id: expect.any(Number),
            name: expect.any(String),
            role: 'admin',
          },
        ],
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('get, not found', () => {
    const requestUsers = () => {
      return request.get('/users/1').catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(404);
      expect(data).toEqual({
        message: 'not found',
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('post', () => {
    const userData = {
      name: 'test user',
      role: 'general',
    };
    const requestUsers = () => {
      return request.post('/users', userData).catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(201);
      expect(data).toEqual({
        user: {
          id: expect.any(Number),
          ...userData,
        },
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('put', () => {
    const userData = {
      id: 1,
      name: 'test user',
      role: 'general',
    };
    const requestUsers = () => {
      return request.put(`/users/${userData.id}`, userData).catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(200);
      expect(data).toEqual({
        user: userData,
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('patch', () => {
    const userData = {
      id: 1,
      name: 'test user',
      role: 'general',
    };
    const requestUsers = () => {
      return request.patch(`/users/${userData.id}`, userData).catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(200);
      expect(data).toEqual({
        user: userData,
      });
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });

  describe('delete', () => {
    const requestUsers = () => {
      return request.delete('/users/1').catch(err => {
        return err.response;
      });
    };

    const expects = ({ status, data }: { status: number; data: any }) => {
      expect(status).toBe(204);
      expect(data).toBe('');
    };

    it('update', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('update');
      }
    });

    it('snapshot', async () => {
      expect.assertions(isNode ? 3 : 2);
      const { status, data, headers } = await requestUsers();

      expects({ status, data });
      if (isNode) {
        expect(headers['x-okoze-snapshot']).toBe('used');
      }
    });
  });
});
