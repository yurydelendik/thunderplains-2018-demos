/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// JS and WebAssembly sigmoid implementation.
// WebAssembly function is loaded by the start() function.
function sigmoid_js(x) {
  return 1 / (1 + Math.exp(-x));
}

let sigmoid_wasm;

function print(type, msg) {
  document.getElementById("term").textContent += `[${type}]\t${msg}\n`;
}

function test_wasm() {
  const start = performance.now();
  let sum = sigmoid_wasm(0);
  for (let i = 30; i > 0; i -= 0.00001)
    sum += sigmoid_wasm(i) + sigmoid_wasm(-i) - 1;
  print("wasm", performance.now() - start);
  console.log("wasm", sum);
}

function test_js() {
  const start = performance.now();
  let sum = sigmoid_js(0); 
  for (let i = 30; i > 0; i -= 0.00001)
    sum += sigmoid_js(i) + sigmoid_js(-i) - 1;
  print("js", performance.now() - start);
  console.log("js", sum);
}

function run() {
  test_js();   test_js();   test_js();   test_js();   test_js();   test_js();   test_js();
  test_wasm(); test_wasm(); test_wasm(); test_wasm(); test_wasm(); test_wasm(); test_wasm();
}

async function start() {
  const wasmLocation = document.location.search.substr(1) || 'sigmoid.wasm';
  const file = await (await fetch(wasmLocation)).arrayBuffer();
  const { instance } = await WebAssembly.instantiate(file, { Math, });
  sigmoid_wasm = instance.exports.sigmoid;

  run();
  setTimeout(run, 1000);
  setTimeout(run, 2000);
  setTimeout(run, 5000);
}
start();
