import { defineConfig } from 'rollup';

// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';

import babel, {
  getBabelOutputPlugin
} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import extensions from 'rollup-plugin-extensions';
import { visualizer } from 'rollup-plugin-visualizer';

const { NODE_ENV } = process.env;

console.log('== NODE_ENV ==', NODE_ENV);

export default defineConfig([
  {
    input: {
      'index': 'lib/index.ts',
    },
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        plugins: [
          nodeResolve(),
        ],
        sourcemap: true
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        plugins: [
          commonjs(),
        ],
        sourcemap: true
      },
      {
        dir: 'dist/umd',
        format: 'umd',
        name: 'ImagePreview',
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            // ...
            presets: ['@babel/preset-env'],
            comments: false,
            minified: true
          })
        ],
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        target: 'es5',
      }),
      babel({
        presets: ['@babel/preset-env']
      }),
      extensions({
        extensions: ['.ts', '.js', '.json'],
        resolveIndex: true
      }),
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      //   filename: 'stats.html'
      // })
    ],
  },
  {
    input: {
      'index.min': 'lib/index.ts',
    },
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        plugins: [
          nodeResolve(),
        ],
        sourcemap: true
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        plugins: [
          commonjs(),
        ],
        sourcemap: true
      },
      {
        dir: 'dist/umd',
        format: 'umd',
        name: 'ImagePreview',
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            // ...
            presets: ['@babel/preset-env'],
            comments: false,
            minified: true
          })
        ],
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        target: 'es5',
      }),
      babel({
        presets: ['@babel/preset-env']
      }),
      extensions({
        extensions: ['.ts', '.js', '.json'],
        resolveIndex: true
      }),
      terser()
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      //   filename: 'stats.html'
      // })
    ],
  }
]);
