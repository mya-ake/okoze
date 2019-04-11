import mergeWith from 'lodash.mergewith';
import { OkozeOptions, OkozeCliOptions, OkozeEnvOptions } from 'src/types';

const loadConfig = (pathname: string) => {
  try {
    return require(pathname);
  } catch (_) {
    return {};
  }
};

export const mergeOptions = (
  argsOptions: OkozeCliOptions,
  config: OkozeOptions,
  envOptions: OkozeEnvOptions,
): OkozeOptions => {
  const customizer = (objValue: any, srcValue: any) => {
    return srcValue ? srcValue : objValue;
  };

  return mergeWith(
    mergeWith(argsOptions, config, customizer),
    envOptions,
    customizer,
  );
};

export const buildOptions = (argsOptions: OkozeCliOptions): OkozeOptions => {
  const envOptions: OkozeEnvOptions = {
    port: Number(process.env.OKOZE_PORT),
    host: process.env.OKOZE_HOST,
    origin: process.env.OKOZE_ORIGIN,
    snapshotDir: process.env.OKOZE_SNAPSHOT_DIR,
  };

  const { config: configPathname } = argsOptions;
  const config = loadConfig(configPathname);
  const options = mergeOptions(argsOptions, config, envOptions);
  return options;
};
