import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
// eslint-disable-next-line import/extensions
import pkg from './package.json';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: './src/index.ts',
	output: {
		file: pkg.main,
		exports: 'named',
		format: 'iife',
	},

	plugins: [
		typescript(),
		babel({
			babelHelpers: 'bundled',
		}),
		resolve(),
		html({
			fileName: 'index.html',
			title: 'Minigame',
			attributes: {
				html: { lang: 'ru' },
				script: { src: 'index.js' },
			},
		}),
		image(),
	],
};

export default config;
