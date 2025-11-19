`wasm-bindgen-rayon` is an adapter for enabling [Rayon](https://github.com/rayon-rs/rayon)-based concurrency on the Web with WebAssembly (via [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen), Web Workers and SharedArrayBuffer support).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- param::isNotitle::true:: -->

- [Usage](#usage)
  - [Setting up](#setting-up)
  - [Using Rayon](#using-rayon)
  - [Building Rust code](#building-rust-code)
    - [Using config files](#using-config-files)
    - [Using command-line params](#using-command-line-params)
  - [Usage with various bundlers](#usage-with-various-bundlers)
    - [Usage with Webpack](#usage-with-webpack)
    - [Usage with Parcel](#usage-with-parcel)
    - [Usage with Rollup / Vite](#usage-with-rollup--vite)
    - [Usage without bundlers](#usage-without-bundlers)
  - [Feature detection](#feature-detection)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Usage

WebAssembly thread support is not yet a first-class citizen in Rust - it's still only available in nightly - so there are a few things to keep in mind when using this crate. Bear with me :)

For a quick demo, check out [this Mandelbrot fractal generator](https://rreverser.com/wasm-bindgen-rayon-demo/):

<table width="100%">
  <tr>
  <td width="50%">

![Drawn using a single thread: 273ms](https://github.com/RReverser/wasm-bindgen-rayon/assets/557590/665cb157-8734-460d-8a0a-a67370e00cb7)
    
  </td>
  <td width="50%">

![Drawn using all available threads via wasm-bindgen-rayon: 87ms](https://github.com/RReverser/wasm-bindgen-rayon/assets/557590/db32a88a-0e77-4974-94fc-1b993030ca92)
    
  </td>
  </tr>
</table>

## Setting up

In order to use `SharedArrayBuffer` on the Web, you need to enable [cross-origin isolation policies](https://web.dev/coop-coep/). Check out the linked article for details.

Then, add `wasm-bindgen`, `rayon`, and this crate as dependencies to your `Cargo.toml`:

```toml
[dependencies]
wasm-bindgen = "0.2"
rayon = "1.8"
wasm-bindgen-rayon = "1.2"
```

Then, reexport the `init_thread_pool` function:

```rust
pub use wasm_bindgen_rayon::init_thread_pool;

// ...
```

This will expose an async `initThreadPool` function in the final generated JavaScript for your library.

You'll need to invoke it right after instantiating your module on the main thread in order to prepare the threadpool before calling into actual library functions:

```js
import init, { initThreadPool /* ... */ } from './pkg/index.js';

// Regular wasm-bindgen initialization.
await init();

// Thread pool initialization with the given number of threads
// (pass `navigator.hardwareConcurrency` if you want to use all cores).
await initThreadPool(navigator.hardwareConcurrency);

// ...now you can invoke any exported functions as you normally would
```

## Using Rayon

Use [Rayon](https://github.com/rayon-rs/rayon) iterators as you normally would, e.g.

```rust
#[wasm_bindgen]
pub fn sum(numbers: &[i32]) -> i32 {
    numbers.par_iter().sum()
}
```

will accept an `Int32Array` from JavaScript side and calculate the sum of its values using all available threads.

## Building Rust code

First limitation to note is that you'll have to use `wasm-bindgen`/`wasm-pack`'s `web` target (`--target web`).

<details>
<summary><i>Why?</i></summary>

This is because the Wasm code needs to take its own object (the `WebAssembly.Module`) and share it with other threads when spawning them. This object is only accessible from the `--target web` and `--target no-modules` outputs, but we further restrict it to only `--target web` as we also use [JS snippets feature](https://rustwasm.github.io/wasm-bindgen/reference/js-snippets.html).

</details>

The other issue is that the Rust standard library for the WebAssembly target is built without threads support to ensure maximum portability.

Since we want standard library to be thread-safe and [`std::sync`](https://doc.rust-lang.org/std/sync/) APIs to work, you'll need to use the nightly compiler toolchain and pass some flags to rebuild the standard library in addition to your own code.

In order to reduce risk of breakages, it's strongly recommended to use a fixed nightly version. This crate was tested with `nightly-2025-11-15`.

### Using config files

The easiest way to configure those flags is:

1. Put the following in a `rust-toolchain.toml` file in your project directory:

  ```toml
  [toolchain]
  channel = "nightly-2025-11-15"
  components = ["rust-src"]
  targets = ["wasm32-unknown-unknown"]
  ```
  
  This tells rustup to use a fixed nightly toolchain with the wasm-target for your project, and to install rust-src, which is required for `build-std`.
2. Put the following in a `.cargo/config.toml` file in your project directory:

   ```toml
   [target.wasm32-unknown-unknown]
   rustflags = [
     "-C", "target-feature=+atomics,+bulk-memory",
     "-C", "link-arg=--shared-memory",
     "-C", "link-arg=--max-memory=1073741824",
     "-C", "link-arg=--import-memory",
     "-C", "link-arg=--export=__wasm_init_tls",
     "-C", "link-arg=--export=__tls_size",
     "-C", "link-arg=--export=__tls_align",
     "-C", "link-arg=--export=__tls_base"
   ]

   [unstable]
   build-std = ["panic_abort", "std"]
   ```

   This tells Cargo to rebuild the standard library with support for Wasm atomics.

Then, run [`wasm-pack`](https://rustwasm.github.io/wasm-pack/book/) as you normally would with `--target web`:

```sh
wasm-pack build --target web [...normal wasm-pack params...]
```

### Using command-line params

If you prefer not to configure those parameters by default, you can pass them as part of the build command itself.

In that case, the whole command looks like this:

```sh
RUSTFLAGS='-C target-feature=+atomics,+bulk-memory
    -Clink-arg=--shared-memory -Clink-arg=--max-memory=1073741824 -Clink-arg=--import-memory
    -Clink-arg=--export=__wasm_init_tls -Clink-arg=--export=__tls_size
    -Clink-arg=--export=__tls_align -Clink-arg=--export=__tls_base' \
  rustup run nightly-2025-11-15 \
  wasm-pack build --target web [...] \
  -- -Z build-std=panic_abort,std
```

It looks a bit scary, but it takes care of everything - choosing the nightly toolchain, enabling the required features as well as telling Cargo to rebuild the standard library. You only need to copy it once and hopefully forget about it :)

## Usage with various bundlers

WebAssembly threads use Web Workers under the hood for instantiating other threads with the same WebAssembly module & memory.

wasm-bindgen-rayon provides the required JS code for those Workers internally, and [uses a syntax that is recognised across various bundlers](https://web.dev/bundling-non-js-resources/).

### Usage with Webpack

If you're using Webpack v5 (version >= 5.25.1), you don't need to do anything special, as it already supports [bundling Workers](https://webpack.js.org/guides/web-workers/) out of the box.

Note that, unlike other bundlers, Webpack will warn about circular dependency because it uses content-based hashing. In our case, we do need to import the same module in both the main thread and the Worker, so this warning can be safely ignored. Hopefully, Webpack will implement support for circular ES modules (which are allowed by the spec) in the future.

### Usage with Parcel

Parcel v2 also recognises the used syntax and works out of the box.

### Usage with Rollup / Vite

We recommend using [Vite](https://vitejs.dev/) for Rollup users, as it has all the necessary plugins built-in.

Alternatively, you should be able to configure Rollup yourself with plugins like [`@surma/rollup-plugin-off-main-thread`](https://github.com/surma/rollup-plugin-off-main-thread) and [`@web/rollup-plugin-import-meta-assets`](https://modern-web.dev/docs/building/rollup-plugin-import-meta-assets/) to bundle Worker and WebAssembly assets respectively.

### Usage without bundlers

The default JS glue was designed in a way that works great with bundlers and code-splitting, but, sadly, not in browsers due to different treatment of import paths (see [`WICG/import-maps#244`](https://github.com/WICG/import-maps/issues/244)).

If you want to build this library for usage without bundlers, enable the `no-bundler` feature for `wasm-bindgen-rayon` in your `Cargo.toml`:

```toml
wasm-bindgen-rayon = { version = "1.2", features = ["no-bundler"] }
```

## Feature detection

If you're targeting [older browser versions that didn't support WebAssembly threads yet](https://webassembly.org/roadmap/), you'll likely want to make two builds - one with threads support and one without - and use feature detection to choose the right one on the JavaScript side.

You can use [`wasm-feature-detect`](https://github.com/GoogleChromeLabs/wasm-feature-detect) library for this purpose. The code will look roughly like this:

```js
import { threads } from 'wasm-feature-detect';

let wasmPkg;

if (await threads()) {
  wasmPkg = await import('./pkg-with-threads/index.js');
  await wasmPkg.default();
  await wasmPkg.initThreadPool(navigator.hardwareConcurrency);
} else {
  wasmPkg = await import('./pkg-without-threads/index.js');
  await wasmPkg.default();
}

wasmPkg.nowCallAnyExportedFuncs();
```

# License

This crate is licensed under the Apache-2.0 license.
