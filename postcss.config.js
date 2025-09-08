module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {
      overrideBrowserslist: [
        '>1%',
        'last 4 versions',
        'ie >= 11',
        'not dead'
      ],
      flexbox: 'no-2009',
      grid: true,
    },
  },
}
