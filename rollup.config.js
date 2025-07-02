import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';

export default {
  input: './index.js',
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
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      extract: 'styles.css',
      minimize: true,
      plugins: [autoprefixer()],
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
    "react",
    "react-dom",
    "react-router-dom"
  ]
};
