const mix = require('laravel-mix');
const config = require('./webpack.config');
require('laravel-mix-bundle-analyzer');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('public/');

mix.webpackConfig(config);

mix.options({
  hmrOptions: {
    host: 'localhost',
    port: 8080
  }
});

mix.react('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');

// if (mix.isWatching()) {
//   mix.bundleAnalyzer({
//     openAnalyzer: false,
//   });
// }