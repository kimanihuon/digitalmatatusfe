const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

const productionPlugins = [new CompressionPlugin,]

module.exports = {
  runtimeCompiler: false,
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