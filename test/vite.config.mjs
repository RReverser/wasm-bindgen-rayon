import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		root: './out/bundler-base/',
		base: './',
		build: {
			outDir: '../vite',
			minify: false,
			target: 'es2022',
		},
		worker: {
			format: 'es',
		},
	};
});
