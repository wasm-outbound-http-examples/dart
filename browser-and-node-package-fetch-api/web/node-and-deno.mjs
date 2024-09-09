import fs from 'node:fs/promises';
import { instantiate, invoke } from './main.mjs';

const buffer = await fs.readFile('./main.wasm');
const module = await WebAssembly.compile(buffer);
const instance = await instantiate(module);

invoke(instance);
