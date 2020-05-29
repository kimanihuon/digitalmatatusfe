const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

const productionPlugins = [new CompressionPlugin,]

module.exports = {
  "configureWebpack": {
    plugins: process.env.VUE_APP_ENV == 'development' ? [ new CompressionPlugin, new BundleAnalyzerPlugin() ] : productionPlugins,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
  "transpileDependencies": [
    "vuetify"
  ]
}