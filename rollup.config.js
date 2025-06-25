import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
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
  ],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'react-toastify',
    'react-icons/fi',
    'react-icons/fa',
    'react-icons/io',
    'react-icons/io5',
    'react-icons/ci',
    'react-icons/ri',
    'react-icons/ai',
    'react-icons/tb',
    'react-date-range',
    'axios',
    'date-fns/locale',
    'jwt-decode',
    'qrcode.react',
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      extract: true,    // style.css olarak ayırır
      minimize: true,   // css minify eder
      sourceMap: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx'],
    }),
  ],
  external: ['react', 'react-dom', 'react-router-dom', 'react-toastify', 'react-icons'],
};
