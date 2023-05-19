module.exports = {
  assetsDir: 'assets',
  devServer: {
    host: 'localhost:8080',
    disableHostCheck: true,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.*config\.js$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'config.js'
              },
            }
          ]
        }
      ]
    }
  }
}
