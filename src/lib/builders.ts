import { join } from 'path';

export const buildOption = () => {
  const protocol = process.env.OKOZE_PROTOCOL || 'http';
  const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
  const host = process.env.OKOZE_HOST || 'localhost';
  const originPort = process.env.OKOZE_ORIGIN_PORT
    ? Number(process.env.OKOZE_ORIGIN_PORT)
    : 3001;
  const originHost = process.env.OKOZE_ORIGIN_HOST || 'localhost';

  const baseURL = `${protocol}://${originHost}:${originPort}`;
  const snapshotDir = join(
    process.env.OKOZE_SNAPSHOT_DIR || process.cwd(),
    '__snapshots__',
  );
  return {
    port,
    host,
    baseURL,
    originPort,
    originHost,
    snapshotDir,
  };
};
