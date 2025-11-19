import { copyFile, cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const srcDir = resolve('node_modules/@taiga-ui/icons/src');
const destRoot = resolve('dist/vsk-ui-kit/assets/taiga-ui');
const destDir = resolve(destRoot, 'icons');
const customIconsDir = resolve('projects/vsk-ui-kit/src/assets/vsk-icons');
const svgExt = '.svg';

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
  await copyCustomIcons();
}

async function copyCustomIcons() {
  let customEntries;

  try {
    customEntries = await readdir(customIconsDir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  await Promise.all(
    customEntries
      .filter((entry) => entry.isFile() && extname(entry.name) === svgExt)
      .map((entry) =>
        copyFile(resolve(customIconsDir, entry.name), resolve(destDir, entry.name)),
      ),
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  copyTaigaIcons().catch((error) => {
    console.error('[icons] Failed to copy Taiga UI icons:', error);
    process.exit(1);
  });
}
