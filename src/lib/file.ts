import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const statPromise = promisify(fs.stat);
const mkdirPromise = promisify(fs.mkdir);
const readFilePromise = promisify(fs.readFile);
const wrightFilePromise = promisify(fs.writeFile);

export const readFile = (pathname: string): Promise<{ [key: string]: any }> => {
  return readFilePromise(pathname, { encoding: 'utf8' })
    .then(data => JSON.parse(data.toString()))
    .catch(_ => ({}));
};

export const existPathname = async (pathname: string) => {
  try {
    await statPromise(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const createDir = (pathname: string) => {
  return mkdirPromise(pathname);
};

const ensureWriteProcess = async (pathname: string) => {
  const fileDirname = path.dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await ensureWriteProcess(fileDirname);
  await createDir(fileDirname);
};

export const wrightFile = async (pathname: string, data: any) => {
  await ensureWriteProcess(pathname);
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  return wrightFilePromise(pathname, data, { encoding: 'utf8' });
};
