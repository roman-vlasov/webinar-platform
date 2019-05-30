const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, './src/components/'),
        Views: path.resolve(__dirname, './src/views/'),
        Enumerations: path.resolve(__dirname, './src/enumerations/'),
        Helpers: path.resolve(__dirname, './src/helpers/'),
        Styles: path.resolve(__dirname, './src/styles/'),
        Fonts: path.resolve(__dirname, './src/assets/fonts/'),
        Icons: path.resolve(__dirname, './src/assets/icons/'),
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources: [
              path.resolve(__dirname, './src/styles/_variables.scss'),
              path.resolve(__dirname, './src/styles/_mixins.scss'),
              path.resolve(__dirname, './src/styles/_animations.scss'),
              path.resolve(__dirname, './src/styles/_fonts.scss'),
              path.resolve(__dirname, './src/styles/theory.scss'),
              path.resolve(__dirname, './src/styles/button-styles.scss'),
              path.resolve(__dirname, './src/styles/hamburgers.scss'),
              path.resolve(__dirname, './src/styles/common.scss'),
            ]
          })
          .end()
    })
    config.module
        .rule('svg')
        .use('file-loader')
        .loader('svg-sprite-loader')
  }
}
