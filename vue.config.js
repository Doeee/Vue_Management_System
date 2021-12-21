module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}