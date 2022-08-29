import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-commonjs';

import pkg from './package.json';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: './src/index.ts',
	output: {
		file: pkg.main,
		exports: 'named',
		format: 'iife',
    sourcemap: true
	},

	plugins: [
		typescript(),
		babel({
			babelHelpers: 'bundled',
		}),
		resolve()
	],
};

export default config;
