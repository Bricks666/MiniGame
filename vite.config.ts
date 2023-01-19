import { babel } from '@rollup/plugin-babel';
import path from 'path';
import { defineConfig } from 'vite';

import pkg from './package.json';

export default defineConfig({
	server: {
		port: 8080,
	},
	build: {
		outDir: pkg.main,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		babel({
			babelHelpers: 'bundled',
		}),
	],
});
