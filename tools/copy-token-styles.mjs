import { mkdir, readdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import less from 'less';

const srcDir = resolve('projects/vsk-ui-kit/tokens/src/styles');
const destDir = resolve('dist/vsk-ui-kit/styles');
const copyExts = new Set(['.less']);

export async function buildTokenStyles() {
  await mkdir(destDir, { recursive: true });

  const entries = await readdir(srcDir, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && copyExts.has(extname(entry.name)))
      .map((entry) =>
        copyFile(resolve(srcDir, entry.name), resolve(destDir, entry.name)),
      ),
  );

  const entryFile = resolve(srcDir, 'vsk-taiga.less');
  const lessSource = await readFile(entryFile, 'utf8');
  const { css } = await less.render(lessSource, {
    filename: entryFile,
  });

  await writeFile(resolve(srcDir, 'vsk-taiga.css'), css, 'utf8');
  await writeFile(resolve(destDir, 'vsk-taiga.css'), css, 'utf8');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildTokenStyles().catch((error) => {
    console.error('[tokens] Failed to build styles:', error);
    process.exit(1);
  });
}
