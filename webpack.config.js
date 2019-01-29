const path = require('path')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: toObject(glob.sync('./src/**/*.js'), './src'),
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].module.js'
  },
  plugins: [
    new CleanWebpackPlugin(['www']),
    new CopyWebpackPlugin([{
      from: 'src/**/*.html',
      to: '[name].[ext]'
    }]),
    new CopyWebpackPlugin([{
      from: 'src/assets/img/**/*.png',
      to: 'assets/img/[name].[ext]'
    }, {
      from: 'src/assets/img/**/*.jpg',
      to: 'assets/img/[name].[ext]'
    }, {
      from: 'src/assets/img/**/*.ico',
      to: 'assets/img/[name].[ext]'
    }, {
      from: 'src/assets/css/**/*.css',
      to: 'assets/css/[name].[ext]'
    }, {
      from: 'src/assets/fonts/**/*.*',
      to: 'assets/fonts/[name].[ext]'
    }, {
      from: 'src/**/*.json',
      to: '[name].[ext]'
    }, {
      from: 'src/**/*.css',
      to: '[name].[ext]'
    }, {
      from: 'node_modules/quagga/',
      to: 'web_modules/quagga/'
    }, {
      from: 'node_modules/toastr/',
      to: 'web_modules/toastr/'
    }, {
      from: 'src/.nojekyll'
    }]),
    new UglifyJSPlugin(),
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{
        urlPattern: new RegExp('http://localhost'),
        handler: 'staleWhileRevalidate'
      },
      {
        urlPattern: new RegExp('https://use.fontawesome.com'),
        handler: 'cacheFirst'
      }]
    })

  ],
  resolve: {
    extensions: ['.js', '.styl', '.css', '.html']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              'syntax-dynamic-import',
              ['@babel/transform-runtime', {
                'helpers': false,
                'regenerator': true
              }]
            ]
          }

        }
      },
      {
        test: /\.html$/,
        include: /src/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        }
      },
      {
        test: /\.styl$/,
        include: /src/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /src/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}

function toObject (paths, exclude) {
  let ret = {}
  paths.forEach(function (path) {
    var a = path.split('/')
    var dir = a.slice(0, a.length - 1).join('/') + '/'
    var name = a[a.length - 1].split('.')
    ret[dir.replace(exclude, '.') + name.slice(0, name.length - 1).join('.')] = path
  })

  return ret
}
