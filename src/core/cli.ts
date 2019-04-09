import cac from 'cac';
import { join } from 'path';
import pkg from '../../package.json';
import { OkozeOptions } from 'src/types';

const cli = cac(pkg.name);

cli.version(pkg.version);
cli.option('-u, --update', 'Update snapshots.', {
  default: false,
});
cli.option('-p, --port <port>', 'Port to launch.', {
  default: 3000,
});
cli.option('-h, --host <host>', 'Host to  to launch.', {
  default: 'localhost',
});
cli.option('--protocol <protocol>', 'Protocol to laounch.', {
  default: 'http',
});
cli.option('--origin <origin>', 'Origin servers origin.');
cli.option('--snapshot-dir <snapshot-dir>', 'Directory for saving snapshots.', {
  default: join(process.cwd(), '__snapshots__'),
});

cli.help();

export const parseArgs = (): OkozeOptions => {
  const parsed = cli.parse();
  const options = {
    ...(parsed.options as OkozeOptions),
    snapshotDir: parsed.options['snapshot-dir'],
  };

  return options;
};
