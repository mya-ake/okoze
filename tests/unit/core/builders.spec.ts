import { mergeOptions } from 'src/core/builders';
import { OkozeCliOptions, OkozeOptions, OkozeEnvOptions } from 'src/types';

const defaultOptions: OkozeCliOptions = {
  update: false,
  port: 3000,
  host: 'localhost',
  snapshotDir: './__snapshots__',
  origin: '',
  config: '',
};

const configOptions = {
  port: 3080,
  host: 'example.com',
  snapshotDir: './config/__snapshots__',
  origin: 'https://example.com',
} as OkozeOptions;

const envConfig: OkozeEnvOptions = {
  port: 4200,
  host: 'example.org',
  snapshotDir: './env/__snapshots__',
  origin: 'https://example.org',
};

describe('core/builders', () => {
  describe('mergeOptions', () => {
    it('default value', () => {
      const options = mergeOptions(defaultOptions, {} as OkozeOptions, {});
      expect(options).toEqual(defaultOptions);
    });

    it('override cli config', () => {
      const options = mergeOptions(defaultOptions, configOptions, {});
      expect(options).toEqual({
        ...configOptions,
        update: false,
        config: '',
      });
    });

    it('override env config', () => {
      const options = mergeOptions(defaultOptions, configOptions, envConfig);
      expect(options).toEqual({
        ...envConfig,
        update: false,
        config: '',
      });
    });
  });
});
