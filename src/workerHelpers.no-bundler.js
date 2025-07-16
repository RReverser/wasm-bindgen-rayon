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

// This file is kept similar to workerHelpers.js, but intended to be used in
// a bundlerless ES module environment (which has a few differences).

function waitForMsgType(target, type) {
  return new Promise(resolve => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data?.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

// We need to wait for a specific message because this file is used both
// as a Worker and as a regular script, so it might receive unrelated
// messages on the page.
if (name === "wasm_bindgen_worker") {
  waitForMsgType(self, 'wasm_bindgen_worker_init').then(async data => {
    const pkg = await import(data.mainJS);
    await pkg.initSync(data.init);
    postMessage({ type: 'wasm_bindgen_worker_ready' });
    pkg.wbg_rayon_start_worker(data.receiver);
  });
}

export async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    init: { module, memory },
    receiver: builder.receiver(),
    mainJS: builder.mainJS()
  };

  await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      // Self-spawn into a new Worker.
      // The script is fetched as a blob so it works even if this script is
      // hosted remotely (e.g. on a CDN). This avoids a cross-origin
      // security error.
      let scriptBlob = await fetch(import.meta.url).then(r => r.blob());
      let url = URL.createObjectURL(scriptBlob);
      const worker = new Worker(url, {
        type: 'module',
        name: 'wasm_bindgen_worker'
      });
      worker.postMessage(workerInit);
      await waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      URL.revokeObjectURL(url);
      return worker;
    })
  );
  builder.build();
}
