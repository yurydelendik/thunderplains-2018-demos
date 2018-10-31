default:

build: spectrum/dsp_rs.wasm simple.wasm gold.wasm sigmoid.wasm

simple.wasm: simple.wat
	wat2wasm simple.wat -o simple.wasm

gold.wasm: gold.wat
	wat2wasm gold.wat -o gold.wasm

sigmoid.wasm: sigmoid.wat
	wat2wasm sigmoid.wat -o sigmoid.wasm

fdlibm/sigmoid.wasm: fdlibm/fdlibm.h fdlibm/sigmoid.c
	$(MAKE) -c fdlibm/sigmoid.wasm

spectrum/dsp_rs.wasm: dsp-rs/target/wasm32-unknown-unknown/release/dsp_rs.wasm
	cp dsp-rs/target/wasm32-unknown-unknown/release/dsp_rs.wasm spectrum/dsp_rs.wasm

dsp-rs/target/wasm32-unknown-unknown/release/dsp_rs.wasm:
	cd dsp-rs; cargo +nightly build --release --target wasm32-unknown-unknown

rebuild: clean build

clean:
	#git checkout -- spectrum/main.js
	-rm spectrum/dsp_rs.wasm
	-rm fdlibm/sigmoid.wasm
	-rm {sigmoid,gold,simple}.wasm

.PHONY: rebuild default clean
