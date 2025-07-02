// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-modules': {
      // Hash + class isimleri
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
}
