"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.spawn = (command, args) => {
    return new Promise((resolve, reject) => {
        const child = child_process_1.spawn(command, args);
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
