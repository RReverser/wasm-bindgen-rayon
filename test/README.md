This is a test project for wasm-bindgen-rayon that ensures that Rayon integration works end-to-end in a browser.

It's built in several variants for couple of popular bundlers as well as with `--features no-bundler` for direct usage in a browser.

Then, each of those variants is tested in a headless Chrome using [Puppeteer](https://developers.google.com/web/tools/puppeteer).
