import { defineConfig } from 'vite';
import offMainThread from '@surma/rollup-plugin-off-main-thread';

export default defineConfig(({ mode }) => {
  const plugins =
    mode === 'production'
      ? [ offMainThread() ]
      : []
	return {
		plugins,
    server:{
      headers:{
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Cross-Origin-Embedder-Policy': 'require-corp',
			},
    },
    root: './out/bundler-base/',
    base: './',
		build: {
      outDir: '../vite',
      minify: false,
      target: 'es2022'
		},
	}
})
