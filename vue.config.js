const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  "configureWebpack": {
    plugins: [new CompressionPlugin,],
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