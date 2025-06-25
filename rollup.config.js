import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss'; // ✅ rollup için doğru plugin
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
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
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      inject: false,   // CSS'i JS içine inject etmez, yani CSS hiç dahil edilmez
      plugins: [tailwindcss(), autoprefixer()],
      minimize: false,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      extensions: ['.js', '.jsx'],
    }),
    url({
      include: ['**/*.mp3'],
      limit: 0, // base64'e çevirme, dosya olarak bırak
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'react-toastify',
    'react-icons',
    'react-icons/fi',
    'react-icons/io',
    'react-icons/io5',
    'react-icons/fa',
    'react-icons/ai',
    'react-icons/ri',
    'react-icons/tb',
    'react-icons/ci',
    'axios',
    'jwt-decode',
    'date-fns/locale',
    'react-date-range',
    'react-date-range/dist/styles.css',
    'react-date-range/dist/theme/default.css',
    'qrcode.react',
  ],
};
