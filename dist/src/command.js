"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./../tests/fixtures/commands");
(async () => {
    console.log('call 1');
    const p = await commands_1.spawn('yarn', ['start']);
    console.log('call 2', p);
})();
