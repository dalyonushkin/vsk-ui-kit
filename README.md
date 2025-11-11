# VskUiKitWorkspace

This workspace hosts the `@vsk/ui-kit` package plus its secondary entry points (`taiga-ui/*`, `tokens`, etc.). Use the instructions below to work locally and to consume our design tokens from downstream apps.

## Design tokens & Taiga-based global styles

Мы поставляем единый провайдер, который загружает базовые стили Taiga UI (шрифты + глобальные правила) и поверх них добавляет наши токены. Вариант подключения через Angular CLI (аналогично официальной инструкции Taiga):

```jsonc
{
  "projects": {
    "my-project": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "@vsk/ui-kit/tokens/styles/vsk-taiga.less"
            ]
          }
        }
      }
    }
  }
}
```

Затем активируйте провайдер один раз:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideVskDesignTokens } from '@vsk/ui-kit/tokens';

bootstrapApplication(AppComponent, {
  providers: [provideVskDesignTokens()],
});
```

`provideVskDesignTokens()` injects a `<style>` block once per document with нашими CSS‑переменными (палитра, радиусы, фокус) и под капотом добавляет `<link>` на собранный CSS (`vsk-taiga.css`). При необходимости можно забрать строковое значение через `VSK_UI_KIT_TOKENS_CSS` и вставить его вручную (например, в Storybook iframe).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Custom Chrome cache or mirror

`npm install` triggers `puppeteer browsers install chrome`, which downloads a dedicated Chrome binary for CI runs. Control two things depending on your build constraints:

- **Cache location:** If the CI host must keep browsers in a writable volume, export `PUPPETEER_CACHE_DIR` (or check in a `.puppeteerrc.cjs` with `cacheDirectory`) before installing dependencies so the binary lands where you expect:

  ```bash
  PUPPETEER_CACHE_DIR=/mnt/build-cache/puppeteer npm install
  ```

  Details: [Puppeteer troubleshooting guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#could-not-find-expected-browser-locally).

- **Download source (air‑gapped builds):** If the build server cannot reach the public Chrome storage bucket, mirror the [Chrome for Testing](https://github.com/GoogleChromeLabs/chrome-for-testing) archives inside your network and point Puppeteer to that mirror by setting `PUPPETEER_CHROME_DOWNLOAD_BASE_URL` (or defining `chrome.downloadBaseUrl` in `.puppeteerrc.cjs`) **before** running `npm install`:

  ```bash
  export PUPPETEER_CHROME_DOWNLOAD_BASE_URL=https://artifacts.mycorp.local/chrome-for-testing
  npm install
  ```

  The value must include the protocol, optional path prefix, and no trailing slash (per [ChromeSettings.downloadBaseUrl](https://github.com/puppeteer/puppeteer/blob/main/docs/api/puppeteer.chromesettings.md)).

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
