module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.externals({
      'vue': "Vue",
      'vuex': "Vuex",
      'vue-router': "VueRouter",
      'element-ui': "ELEMENT",
    });
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
