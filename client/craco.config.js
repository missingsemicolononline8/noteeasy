const tailwindcss = require('tailwindcss');

module.exports = {
  style: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        'postcss-preset-env': {
          features: { 'nesting-rules': false },
        },
      }
    },
  },
};