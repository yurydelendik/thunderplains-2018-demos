# Thunderplains 2018 Demos

Some examples from [slides](docs/Using%20WebAssembly%20in%20_all_%20the%20Web.pdf) for the https://2018.thunderplainsconf.com/.

## Simple example

```
cat simple.wat
wat2wasm simple.wat -o simple.wasm
xxd simple.wasm
```

## Golden ration example

```
cat gold.wat
wat2wasm gold.wat -o gold.wasm
```

In node (e.g. `node --experimental-repl-await`):
```
> const file = require('fs').readFileSync('gold.wasm');
> const { instance, module } = await WebAssembly.instantiate(file);
> WebAssembly.Module.exports(module)
[ { name: 'gold', kind: 'function' } ]
> instance.exports.gold()
1.618033988749895
```

## Sigmoid example

```
cat sigmoid.wat
wat2wasm sigmoid.wat -o sigmoid.wasm
```

In browser console, opened at this directory file, e.g. README.md,

```
const wasm = await WebAssembly.instantiateStreaming(fetch('sigmoid.wasm'), {Math,});
const { instance: { exports: { sigmoid }}} = wasm;
sigmoid(0)
```

See also [benchmark](sigmoid.html).

The sigmoid without JS import can be found at the "fdlibm/" directory, and run [benchmark](sigmoid.html?fdlibm/sigmoid.wasm).

## Spectrum examples

Run [original spectrum](spectrum/index.html) application. The FFT JavaScript code is taken from https://github.com/corbanbrook/dsp.js.

Let's modify it to use WebAssembly:
- Let create Rust project
    * Use https://docs.rs/dft/0.5.5/dft/ as dependency
    * dsp-rs/src/lib.rs contains exports library functions
    * Copy target/wasm32-unknown-unknown/dsp_rs.wasm into the "spectrum/"
- Let create JS module to wrap the WebAssembly/Rust functions
    * [spectrum/wasm_dft.js](spectrum-final/wasm_dft.js) instantiates dsp_rs.wasm
- Modify main.js
    * To wait on WebAssembly module loading/initialization
    * Add calc_spectrum_wasm function that uses wasm_dft.js exports

The intended [result](spectrum-final/index.html).
