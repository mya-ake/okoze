import { OkozeApp, buildOption, parseArgs } from './core';

const parsedCliOptions = parseArgs();

const options = buildOption(parsedCliOptions);

const app = new OkozeApp(options);
