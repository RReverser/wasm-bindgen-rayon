import { defineConfig } from 'vite';
import offMainThread from '@surma/rollup-plugin-off-main-thread';

export default defineConfig(() => {
	return {
		plugins: [
      // offMainThread(),
		],
    server:{
      headers:{
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Cross-Origin-Embedder-Policy': 'require-corp',
			},
    },
    root: './out/bundler-base/',
		build: {
      outDir: '../vite',
      minify: false,
      target: 'es2022'
		},
	}
})
