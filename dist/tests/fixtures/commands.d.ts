/// <reference types="node" />
import { ChildProcess } from 'child_process';
export declare const spawn: (command: string, args: string[]) => Promise<ChildProcess>;
