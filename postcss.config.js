// postcss.config.js
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'), // 🎯 Tailwind config'ini dahil et!
    autoprefixer(),
  ],
}
