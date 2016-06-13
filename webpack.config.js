const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

const TARGET = process.env.NODE_ENV || 'development'
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: PATHS.src
    },
    {
      test: /\.sass$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.css$/,
      loaders: 'style!css'
    }]
  }
};

if (TARGET === 'development' || !TARGET) {
  console.log('START', TARGET)
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({save: true})
    ],
  })
}

if(TARGET === 'production') {
  console.log('BUILD', TARGET)
  module.exports = merge(common, {
    output: {
      path: PATHS.build,
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  })
}