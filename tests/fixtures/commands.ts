import { spawn as commandSpawn, ChildProcess } from 'child_process';

export const spawn = (
  command: string,
  args: string[],
): Promise<ChildProcess> => {
  return new Promise((resolve, reject) => {
    const child = commandSpawn(command, args);
    child.on('error', data => {
      reject(data);
    });
    child.on('exit', data => {
      if (data === 0) {
        return;
      }
      reject(data);
    });
    resolve(child);
  });
};
