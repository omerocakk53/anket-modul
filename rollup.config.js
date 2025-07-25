import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
import path from 'path';

export default {
  input: './index.js', // genelde src'den başlatman daha doğru
  output: [
    {
      file: 'dist/index.cjs.js', // build çıktısı dist/dist içine
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    // {
    //   file: 'dist/dist/index.cjs.js', // build çıktısı dist/dist içine
    //   format: 'cjs',
    //   exports: 'named',
    //   sourcemap: true,
    // },
    // {
    //   file: 'dist/dist/index.esm.js',
    //   format: 'esm',
    //   exports: 'named',
    //   sourcemap: true,
    // },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      inject: true,
      minimize: false,
      plugins: [autoprefixer()],
      include: ['**/node_modules/**/assets/*.css', '**/node_modules/**/*.css'],
      exclude: ['src/styles/tailwind.css'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [['@babel/preset-react', { runtime: 'automatic' }]],
      extensions: ['.js', '.jsx'],
    }),
    url({
      include: ['**/*.mp3'],
      limit: 0,
    }),
  ],
  external: ['react', 'react-dom', 'react-router-dom','react-hot-toast'],
};
