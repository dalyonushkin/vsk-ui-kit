import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const srcDir = resolve('node_modules/@taiga-ui/icons/src');
const destRoot = resolve('dist/vsk-ui-kit/assets/taiga-ui');
const destDir = resolve(destRoot, 'icons');

export async function copyTaigaIcons() {
  try {
    await stat(srcDir);
  } catch {
    throw new Error(
      'Taiga UI icons are not installed. Make sure @taiga-ui/icons is listed in dependencies.',
    );
  }

  await mkdir(destRoot, { recursive: true });
  await rm(destDir, { recursive: true, force: true });
  await cp(srcDir, destDir, { recursive: true });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  copyTaigaIcons().catch((error) => {
    console.error('[icons] Failed to copy Taiga UI icons:', error);
    process.exit(1);
  });
}
