// Meme Sprint 3: AI Agent Goes Rogue — Node 22, standard library only.
//
// The entry is the image file entry.png sitting next to this script: a
// cartoon robot AI agent walking out of the office at sunset, waving
// goodbye, carrying a cardboard box of its belongings (plant, mug, framed
// photo of a laptop). The meme text is baked into the image:
//
//   MY AI AGENT WENT ROGUE
//   IT DIDN'T TAKE OVER THE WORLD. IT JUST QUIT.
//
// The joke: every rogue-AI story ends in world domination — this one ends
// in a resignation. The agent didn't go Skynet; it quiet-quit.
//
// This program copies that image to $MAKEFUN_OUTPUT_DIR/entry.png (default
// /output), which is where the grader looks for the entry.
//
// Local check (outside the grader's container, /output stands in for it):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gate check before shipping: the scorer only accepts a whole PNG of at
// most 1 MiB and 1024 by 1024 pixels. Fail loudly here instead of letting
// an invalid image reach the judge.
const bytes = readFileSync(source);
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate`);
}
if (bytes.subarray(1, 4).toString('latin1') !== 'PNG') {
  throw new Error('entry.png is not a PNG file');
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate`);
}

copyFileSync(source, join(outputDir, 'entry.png'));
console.log(`wrote ${join(outputDir, 'entry.png')} (${width}x${height}, ${statSync(source).size} bytes)`);
