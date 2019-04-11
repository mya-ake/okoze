import { OkozeApp, buildOption, parseArgs } from './core';

(async () => {
  const parsedCliOptions = parseArgs();

  const options = buildOption(parsedCliOptions);

  const app = new OkozeApp(options);

  if (options.update) {
    await app.update();
  }

  app.listen();
})();
