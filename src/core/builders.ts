import { OkozeOptions } from 'src/types';

export const buildOption = (argsOptions: OkozeOptions): OkozeOptions => {
  const envOptions = {
    port: Number(process.env.OKOZE_PORT),
    host: process.env.OKOZE_HOST,
    origin: process.env.OKOZE_ORIGIN,
    snapshotDir: process.env.OKOZE_SNAPSHOT_DIR,
  };

  return {
    update: argsOptions.update,
    port: envOptions.port || argsOptions.port,
    host: envOptions.host || argsOptions.host,
    origin: envOptions.origin || argsOptions.origin,
    snapshotDir: envOptions.snapshotDir || argsOptions.snapshotDir,
  };
};
