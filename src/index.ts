#!/usr/bin/env node

import { OkozeApp, buildOptions, parseArgs } from './core';

(async () => {
  const parsedCliOptions = parseArgs();

  const options = buildOptions(parsedCliOptions);

  const app = new OkozeApp(options);

  if (options.update) {
    await app.update();
  }

  app.listen();
})();
