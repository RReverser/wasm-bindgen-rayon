(()=>{"use strict";var e={801:(e,r,t)=>{function n(e,r){return new Promise((t=>{e.addEventListener("message",(function n({data:o}){o?.type===r&&(e.removeEventListener("message",n),t(o))}))}))}let o;async function i(e,r,i){if(0===i.numThreads())throw new Error("num_threads must be > 0.");const a={type:"wasm_bindgen_worker_init",init:{module_or_path:e,memory:r},receiver:i.receiver()};o=await Promise.all(Array.from({length:i.numThreads()},(async()=>{const e=new Worker(new URL(t.p+t.u(801),t.b),{type:void 0});return e.postMessage(a),await n(e,"wasm_bindgen_worker_ready"),e}))),i.build()}t.d(r,{G:()=>i}),n(self,"wasm_bindgen_worker_init").then((async({init:e,receiver:r})=>{const n=await t.e(780).then(t.bind(t,780));await n.default(e),postMessage({type:"wasm_bindgen_worker_ready"}),n.wbg_rayon_start_worker(r)}))}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={id:n,loaded:!1,exports:{}};return e[n](i,i.exports,t),i.loaded=!0,i.exports}t.m=e,t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((r,n)=>(t.f[n](e,r),r)),[])),t.u=e=>e+".index.js",t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var r=t.g.document;if(!e&&r&&(r.currentScript&&"SCRIPT"===r.currentScript.tagName.toUpperCase()&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");if(n.length)for(var o=n.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=n[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),(()=>{t.b=self.location+"";var e={801:1};t.f.i=(r,n)=>{e[r]||importScripts(t.p+t.u(r))};var r=self.webpackChunk=self.webpackChunk||[],n=r.push.bind(r);r.push=r=>{var[o,i,a]=r;for(var s in i)t.o(i,s)&&(t.m[s]=i[s]);for(a&&a(t);o.length;)e[o.pop()]=1;n(r)}})(),t(801)})();