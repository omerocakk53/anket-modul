import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import progress from "rollup-plugin-progress";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  input: "./index.js",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      inject: true,
      minimize: true,
      modules: false,
      plugins: [tailwindcss, autoprefixer],
      extensions: [".css"],
      extract: "styles.css",
    }),
    resolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: [["@babel/preset-react", { runtime: "automatic" }]],
      extensions: [".js", ".jsx"],
    }),
    url({
      include: ["**/*.mp3", "**/*.png", "**/*.jpg", "**/*.svg"],
      limit: 0,
    }),
    progress({ clearLine: true }),
  ],
  external: ["react", "react-dom", "react-router-dom", "react-hot-toast"],
  onwarn(warning, warn) {
    if (
      warning.code === "MODULE_LEVEL_DIRECTIVE" &&
      warning.message.includes("'use client'")
    ) {
      return;
    }
    warn(warning);
  },
};
