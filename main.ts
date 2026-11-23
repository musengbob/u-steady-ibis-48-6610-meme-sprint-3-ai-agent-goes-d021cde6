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

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

copyFileSync(source, join(outputDir, 'entry.png'));
