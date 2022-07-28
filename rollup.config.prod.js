import { terser } from 'rollup-plugin-terser';
import baseConfig from './rollup.config';

/** @type {import('rollup').RollupOptions} */
const config = { ...baseConfig, plugins: [...baseConfig.plugins, terser()] };

export default config;
