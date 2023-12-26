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

import serveHandler from 'serve-handler';
import { createServer } from 'node:http';
import puppeteer from 'puppeteer';
import getPort from 'get-port';
import { promises as fs } from 'fs';
import { test, after } from 'node:test';

async function logStep(description, promise) {
  process.stdout.write(`${description}…`);
  const result = await promise;
  process.stdout.write(' done.\n');
  return result;
}

async function startServer() {
  const config = JSON.parse(await fs.readFile('serve.json', 'utf-8'));

  return new Promise(resolve => {
    createServer((request, response) => serveHandler(request, response, config))
      .unref() // We don't want to block the script on the server.
      .listen(port, resolve);
  });
}

const port = await logStep('Getting available port', getPort());
await logStep(`Starting server on port ${port}`, startServer());
const browser = await logStep(
  `Starting browser`,
  puppeteer.launch({
    headless: 'new'
  })
);

after(() => browser.close());

async function runTest(t, url = `/pkg/${t.name}/index.html`) {
  const { name } = t;

  const page = await browser.newPage();
  t.after(() => page.close());

  page.on('console', message => {
    console.log(`${name}: ${message.type()}: ${message.text()}`);
  });
  let functionExposed;
  const donePromise = new Promise((resolve, reject) => {
    functionExposed = page.exposeFunction('onDone', resolve);
    page.on('pageerror', reject);
  });
  await functionExposed;
  await page.goto(`http://localhost:${port}${url}`);
  await donePromise;
}

test('no-bundler', t => runTest(t, '/index.html'));
test('rollup', t => runTest(t));
test('webpack', t => runTest(t));
// Parcel seems broken for now: https://github.com/parcel-bundler/parcel/issues/8727
test.skip('parcel', t => runTest(t));
