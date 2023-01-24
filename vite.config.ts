/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

import pkg from './package.json' assert { type: 'json' };

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
			'~': path.resolve(__dirname, 'src', 'shared', 'packages'),
		},
	},
	plugins: [
		babel({
			babelHelpers: 'bundled',
		})
	],
});
