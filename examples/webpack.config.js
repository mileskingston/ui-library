const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const BABEL_CONF = {
  babelrc: false,
  presets: [
    'react',
    ['env', {
      targets: {
        browsers: [
          'last 5 versions',
          'IE >= 9'
        ]
      }
    }],
    'stage-1'
  ]
};

const outputPath = !isProd ? path.resolve(__dirname, 'dev') : path.resolve(__dirname, 'public');

module.exports = {
  devtool: 'source-map',
  entry: {
    cardselection: ['./examples/cardselection/index.js'],
    storefinder: ['./examples/storefinder/index.js']
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name]/[name].build.js',
    hotUpdateMainFilename: '../../../[hash].hot-update.json',
    hotUpdateChunkFilename: '../../../[id].[hash].hot-update.js'
  },
  module: {
    rules: [
      {
        test: /\.modernizrrc\.js$/,
        use: ['webpack-modernizr-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [`babel-loader?${JSON.stringify(BABEL_CONF)}`]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: ['last 5 versions', 'IE > 9']
                  })
                ];
              }
            }
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './.modernizrrc.js')
    }
  }
};
