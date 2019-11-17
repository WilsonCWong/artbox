const mix = require('laravel-mix');
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

mix.webpackConfig({
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": __dirname + "/resources/js"
    }
  }
});

mix.options({
  hmrOptions: {
    host: 'artbox.test',
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