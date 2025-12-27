/**
 * PostCSS Configuration
 * For CSS optimization and autoprefixing
 */

module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11'
      ]
    }),
    require('cssnano')({
      preset: ['advanced', {
        discardComments: {
          removeAll: true
        },
        reduceIdents: false,
        zindex: false,
        mergeIdents: false,
        discardUnused: {
          fontFace: false,
          keyframes: false
        },
        minifyFontValues: true,
        normalizeUrl: true,
        normalizeWhitespace: true,
        colormin: true,
        minifySelectors: true,
        minifyParams: true,
        calc: {
          precision: 3
        }
      }]
    })
  ]
};
