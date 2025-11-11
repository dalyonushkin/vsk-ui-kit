import chokidar from 'chokidar';
import { resolve } from 'node:path';
import { buildTokenStyles } from './copy-token-styles.mjs';

const stylesDir = resolve('projects/vsk-ui-kit/tokens/src/styles');
let building = false;
let pending = false;

async function runBuild(reason = 'initial') {
  if (building) {
    pending = true;
    return;
  }

  building = true;
  try {
    await buildTokenStyles();
    console.log(`[tokens] styles built (${reason})`);
  } catch (error) {
    console.error('[tokens] build failed:', error);
  } finally {
    building = false;
    if (pending) {
      pending = false;
      runBuild('change');
    }
  }
}

await runBuild();

const watcher = chokidar.watch(stylesDir, {
  ignoreInitial: true,
  usePolling: true,
  interval: 250,
  depth: Infinity,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 50,
  },
});

watcher.on('all', (event, path) => {
  if (!path.endsWith('.less')) {
    return;
  }

  console.log(`[tokens] ${event}: ${path}`);
  runBuild('change');
});

console.log(`[tokens] watching styles in ${stylesDir}`);

process.on('SIGINT', async () => {
  await watcher.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await watcher.close();
  process.exit(0);
});

// Keep process alive
await new Promise(() => {});
