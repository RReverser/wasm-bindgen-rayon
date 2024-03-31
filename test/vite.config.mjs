import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		server: {
			headers: {
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Cross-Origin-Embedder-Policy': 'require-corp',
			},
		},
		root: './out/bundler-base/',
		base: './',
		build: {
			outDir: '../vite',
			minify: false,
			target: 'es2022',
		},
	};
});
