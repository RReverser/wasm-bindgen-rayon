(()=>{"use strict";var n={551:(n,e,t)=>{var r=t(604);onmessage=async({data:{module:n,memory:e,receiver:t}})=>{await(0,r.default)(n,e),postMessage(!0),(0,r.wbg_rayon_start_worker)(t)}},604:(n,e,t)=>{let r,o;t.d(e,{default:()=>h,wbg_rayon_start_worker:()=>l}),n=t.hmd(n);const i=new Array(128).fill(void 0);function _(n){return i[n]}i.push(void 0,null,!0,!1);let c=i.length;function a(n){const e=_(n);return function(n){n<132||(i[n]=c,c=n)}(n),e}const u="undefined"!=typeof TextDecoder?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};"undefined"!=typeof TextDecoder&&u.decode();let s=null;function b(n,e){return n>>>=0,u.decode((null!==s&&s.buffer===o.memory.buffer||(s=new Uint8Array(o.memory.buffer)),s).slice(n,n+e))}function f(n){c===i.length&&i.push(i.length+1);const e=c;return c=i[e],i[e]=n,e}let w=null,d=null;function g(n,e){try{return n.apply(this,e)}catch(n){o.__wbindgen_exn_store(f(n))}}function l(n){o.wbg_rayon_start_worker(n)}class p{static __wrap(n){n>>>=0;const e=Object.create(p.prototype);return e.__wbg_ptr=n,e}__destroy_into_raw(){const n=this.__wbg_ptr;return this.__wbg_ptr=0,n}free(){const n=this.__destroy_into_raw();o.__wbg_wbg_rayon_poolbuilder_free(n)}numThreads(){return o.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr)>>>0}receiver(){return o.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr)>>>0}build(){o.wbg_rayon_poolbuilder_build(this.__wbg_ptr)}}function y(){const e={wbg:{}};return e.wbg.__wbindgen_object_drop_ref=function(n){a(n)},e.wbg.__wbg_instanceof_Window_3e5cd1f48c152d01=function(n){let e;try{e=_(n)instanceof Window}catch(n){e=!1}return e},e.wbg.__wbg_crypto_d05b68a3572bb8ca=function(n){return f(_(n).crypto)},e.wbg.__wbindgen_is_object=function(n){const e=_(n);return"object"==typeof e&&null!==e},e.wbg.__wbg_process_b02b3570280d0366=function(n){return f(_(n).process)},e.wbg.__wbg_versions_c1cb42213cedf0f5=function(n){return f(_(n).versions)},e.wbg.__wbg_node_43b1089f407e4ec2=function(n){return f(_(n).node)},e.wbg.__wbindgen_is_string=function(n){return"string"==typeof _(n)},e.wbg.__wbg_msCrypto_10fc94afee92bd76=function(n){return f(_(n).msCrypto)},e.wbg.__wbg_require_9a7e0f667ead4995=function(){return g((function(){return f(n.require)}),arguments)},e.wbg.__wbindgen_is_function=function(n){return"function"==typeof _(n)},e.wbg.__wbindgen_string_new=function(n,e){return f(b(n,e))},e.wbg.__wbg_getRandomValues_7e42b4fb8779dc6d=function(){return g((function(n,e){_(n).getRandomValues(_(e))}),arguments)},e.wbg.__wbg_randomFillSync_b70ccbdf4926a99d=function(){return g((function(n,e){_(n).randomFillSync(a(e))}),arguments)},e.wbg.__wbg_newnoargs_c62ea9419c21fbac=function(n,e){return f(new Function(b(n,e)))},e.wbg.__wbg_call_90c26b09837aba1c=function(){return g((function(n,e){return f(_(n).call(_(e)))}),arguments)},e.wbg.__wbindgen_object_clone_ref=function(n){return f(_(n))},e.wbg.__wbg_self_f0e34d89f33b99fd=function(){return g((function(){return f(self.self)}),arguments)},e.wbg.__wbg_window_d3b084224f4774d7=function(){return g((function(){return f(window.window)}),arguments)},e.wbg.__wbg_globalThis_9caa27ff917c6860=function(){return g((function(){return f(globalThis.globalThis)}),arguments)},e.wbg.__wbg_global_35dfdd59a4da3e74=function(){return g((function(){return f(t.g.global)}),arguments)},e.wbg.__wbindgen_is_undefined=function(n){return void 0===_(n)},e.wbg.__wbg_call_5da1969d7cd31ccd=function(){return g((function(n,e,t){return f(_(n).call(_(e),_(t)))}),arguments)},e.wbg.__wbg_buffer_a448f833075b71ba=function(n){return f(_(n).buffer)},e.wbg.__wbg_newwithbyteoffsetandlength_d0482f893617af71=function(n,e,t){return f(new Uint8Array(_(n),e>>>0,t>>>0))},e.wbg.__wbg_new_8f67e318f15d7254=function(n){return f(new Uint8Array(_(n)))},e.wbg.__wbg_set_2357bf09366ee480=function(n,e,t){_(n).set(_(e),t>>>0)},e.wbg.__wbg_newwithlength_6c2df9e2f3028c43=function(n){return f(new Uint8Array(n>>>0))},e.wbg.__wbg_subarray_2e940e41c0f5a1d9=function(n,e,t){return f(_(n).subarray(e>>>0,t>>>0))},e.wbg.__wbindgen_throw=function(n,e){throw new Error(b(n,e))},e.wbg.__wbindgen_module=function(){return f(m.__wbindgen_wasm_module)},e.wbg.__wbindgen_memory=function(){return f(o.memory)},e.wbg.__wbg_startWorkers_8a96a2064fdae25c=function(n,e,o){const i=async function(n,e,o){if(0===o.numThreads())throw new Error("num_threads must be > 0.");const i={module:n,memory:e,receiver:o.receiver()};r=await Promise.all(Array.from({length:o.numThreads()},(async()=>{const n=new Worker(new URL(t.p+t.u(604),t.b),{type:void 0});return n.postMessage(i),await new Promise((e=>n.addEventListener("message",e,{once:!0}))),n}))),o.build()}(a(n),a(e),p.__wrap(o));return f(i)},e}async function m(n,e){if(void 0!==o)return o;void 0===n&&(n=new URL(t(298),t.b));const r=y();("string"==typeof n||"function"==typeof Request&&n instanceof Request||"function"==typeof URL&&n instanceof URL)&&(n=fetch(n)),function(n,e){n.wbg.memory=e||new WebAssembly.Memory({initial:18,maximum:16384,shared:!0})}(r,e);const{instance:i,module:_}=await async function(n,e){if("function"==typeof Response&&n instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(n,e)}catch(e){if("application/wasm"==n.headers.get("Content-Type"))throw e;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e)}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}(await n,r);return function(n,e){return o=n.exports,m.__wbindgen_wasm_module=e,w=null,s=null,d=null,o.__wbindgen_start(),o}(i,_)}const h=m},298:(n,e,t)=>{n.exports=t.p+"85128c95cf2e4b6f30b3.wasm"}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,loaded:!1,exports:{}};return n[r](i,i.exports,t),i.loaded=!0,i.exports}t.m=n,t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.u=n=>n+".index.js",t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.hmd=n=>((n=Object.create(n)).children||(n.children=[]),Object.defineProperty(n,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+n.id)}}),n),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var r=e.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!n;)n=r[o--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.b=self.location+"",t(551)})();