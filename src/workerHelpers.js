/*
 * Copyright 2022 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: we use `wasm_bindgen_worker_`-prefixed message types to make sure
// we can handle bundling into other files, which might happen to have their
// own `postMessage`/`onmessage` communication channels.
//
// If we didn't take that into the account, we could send much simpler signals
// like just `0` or whatever, but the code would be less resilient.

function waitForMsgType(target, type) {
  return new Promise(resolve => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data?.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

// # Note
// Our JS should have been generated in
// `[out-dir]/snippets/wasm-bindgen-rayon-[hash]/workerHelpers.js`,
// resolve the main module via `../../..`.
//
// This might need updating if the generated structure changes on wasm-bindgen
// side ever in the future, but works well with bundlers today. The whole
// point of this crate, after all, is to abstract away unstable features
// and temporary bugs so that you don't need to deal with them in your code.
import { initSync, wbg_rayon_start_worker } from '../../..';

if (name === "wasm_bindgen_worker") {
  waitForMsgType(self, 'wasm_bindgen_worker_init').then(async data => {
    initSync(data.init);
    postMessage({ type: 'wasm_bindgen_worker_ready' });
    wbg_rayon_start_worker(data.receiver);
  });
}

export async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    init: { module, memory },
    receiver: builder.receiver()
  };

  await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      // Self-spawn into a new Worker.
      //
      // TODO: while `new URL('...', import.meta.url) is a semi-standard
      // way to get asset URLs relative to the module across various bundlers
      // and browser, ideally we should switch to `import.meta.resolve`
      // once it becomes supported across bundlers as well.
      //
      // Note: we could use `../../..` as the URL here to inline workerHelpers.js
      // into the parent entry instead of creating another split point, but some
      // bundlers don't support that in `new Worker` expressions.
      const worker = new Worker(
        /* webpackChunkName: 'wasm-bindgen-rayon' */ new URL(
          './workerHelpers.js',
          import.meta.url
        ),
        {
          type: 'module',
          name: 'wasm_bindgen_worker'
        }
      );
      worker.postMessage(workerInit);
      await waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      return worker;
    })
  );
  builder.build();
}
