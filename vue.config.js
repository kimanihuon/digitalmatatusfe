const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

const productionPlugins = [new CompressionPlugin,]

module.exports = {
  runtimeCompiler: false,
  css: {
    // extract CSS in components into a single CSS file (only in production)
    // can also be an object of options to pass to extract-text-webpack-plugin
    extract: true,

    // Enable CSS modules for all css / pre-processor files.
    // This option does not affect *.vue files.
    // modules: false,

    // enable CSS source maps?
    sourceMap: false,

    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    loaderOptions: {}
  },
  "configureWebpack": {
    plugins: process.env.VUE_APP_ENV == 'development' ? [ new CompressionPlugin, new BundleAnalyzerPlugin() ] : productionPlugins,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
  "transpileDependencies": [
    "vuetify"
  ]
}