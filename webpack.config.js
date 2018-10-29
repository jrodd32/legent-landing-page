const webpack = require('webpack'); // to access built-in Webpack plugins
const path = require('path'); // adds file path functionality
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const routes = require('./webpack.routes.json');

// Environment Config Variables
const env = process.env.WEBPACK_ENV;
const publicAssetsPath = path.resolve(__dirname, 'build');
const sourceAssetsPath = path.resolve(__dirname, 'src');
const exportPath = path.resolve(__dirname, publicAssetsPath);

// CSS
const cssFolder = '/sass/';
const cssEntryFilename = 'app.scss';
const cssEntryPath = sourceAssetsPath + cssFolder + cssEntryFilename;
const cssExportFilename = 'bundle.css';

// JS
const jsFolder = '/js/';
const jsFilename = 'app.js';
const jsEntryPath = sourceAssetsPath + jsFolder + jsFilename;
const jsExportFilename = 'bundle.js';

// IMAGES
const imagesFolder = '/images/';
const imagesEntryPath = sourceAssetsPath + imagesFolder;
const imagesExportPath = publicAssetsPath + imagesFolder;

// FONTS
const fontsFolder = '/fonts/';
const fontsEntryPath = sourceAssetsPath + fontsFolder;
const fontsExportPath = publicAssetsPath + fontsFolder;

// SERVICE WORKER
const serviceWorkerFilename = 'service-worker.js';
const serviceWorkerEntryPath = sourceAssetsPath + jsFolder + serviceWorkerFilename;
const serviceWorkerExportPath = `${publicAssetsPath}/${serviceWorkerFilename}`;

// MANIFEST
const manifestFilename = 'manifest.json';
const manifestEntryPath = `${sourceAssetsPath}/${manifestFilename}`;
const manifestExportPath = `${publicAssetsPath}/${manifestFilename}`;

// Delete build files
const pathsToClean = [
  publicAssetsPath
];

const cleanOptions = {
  exclude: [
    'workbox-sw.prod.v2.1.2.js',
    'vendor.js',
    'robots.txt'
  ],
  verbose: true,
  dry: false
};
const CleanWebpackPluginConfig = new CleanWebpackPlugin(pathsToClean, cleanOptions);

// Extract SASS to their own files
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: cssExportFilename,
  disable: env === 'development',
  allChunks: true
});

// Copies files
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: imagesEntryPath, to: imagesExportPath },
  { from: fontsEntryPath, to: fontsExportPath },
  { from: manifestEntryPath, to: manifestExportPath }
]);

// service worker config
// const ServiceWorkerConfig = new WorkboxPlugin({
//   globDirectory: publicAssetsPath,
//   globPatterns: ['**/*.{html,js,css,json,jpg,png,svg,mp4,webm,woff,woff2}'],
//   globIgnores: [
//     'template.html',
//     'images/*'
//   ],
//   swSrc: serviceWorkerEntryPath,
//   swDest: serviceWorkerExportPath,
//   clientsClaim: true,
//   skipWaiting: true
// });

// Extract node_module dependencies into it's own vendor.js file
const VendorExtractionConfig = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.min.js',
  // Everything in use in app that lives in node_modules directory
  // Chuch into it's own vendor.js file
  minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
});

const PluginConfig = [
  CleanWebpackPluginConfig,
  ExtractTextPluginConfig,
  CopyWebpackPluginConfig,
  // ServiceWorkerConfig,
  VendorExtractionConfig
];

PluginConfig.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/template.html',
  inject: false
}));

// Differ settings based on production flag
if (env === 'production') {
  PluginConfig.push(new UglifyJsPlugin({
    test: /\.js($|\?)/i
  }));

  PluginConfig.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }));

  PluginConfig.push(new OptimizeCssAssetsPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } }
  }));

  PluginConfig.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$|\.woff2?.+$|\.woff?.+$|\.svg?.+$/,
    threshold: 10240,
    minRatio: 0.8
  }));
}

// prerender pages
if (process.env.PRERENDER) {
  const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
  PluginConfig.push(new PrerenderSPAPlugin({
    indexPath: path.join(__dirname, 'build/index.html'),
    minify: {
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      removeComments: true,
      sortAttributes: true
    },
    outputDir: publicAssetsPath,
    postProcess(context) {
      const route = context.route === '/' ? 'index.html' : `${context.route}.html`;
      context.outputPath = path.join(__dirname, 'build', route);

      return context;
    },
    routes,
    renderer: new Renderer({
      inject: {
        isPrendering: true
      },
      injectProperty: 'prerender',
      maxConcurrentRoutes: 10,
      renderAfterDocumentEvent: 'page-rendered',
      headless: false
    }),
    staticDir: publicAssetsPath
  }));
}

module.exports = {
  entry: [
    cssEntryPath,
    jsEntryPath
  ],
  output: {
    path: exportPath,
    filename: jsExportFilename
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPluginConfig.extract({
            use: [{
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader'
            }],
            // use style-loader in development
            fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[name].[ext]'
            }
        }]
      },
      {
        test: /\.(woff(2*))$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert fonts < 8kb to base64 strings
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // webfontloader (https://github.com/typekit/webfontloader)
      webfontloader: path.resolve(__dirname, './node_modules/webfontloader/webfontloader.js'),
      TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: PluginConfig
};
