const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const componentsDir = path.join(__dirname, 'src');
const configDir = path.join(__dirname, 'src/config');
const helpersDir = path.join(__dirname, 'src/helpers');
const iconsDir = path.join(__dirname, 'src/atoms/icons');
const styleDir = path.join(__dirname, 'src/style');
const styleguideUtilsDir = path.join(__dirname, 'styleguide-utils');
const customCssFile = path.join(__dirname, 'styleguide.custom.css');

const COUNTRY = process.env.COUNTRY || 'GB';
const THEME = process.env.THEME || 'currys';

module.exports = {
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [componentsDir, configDir, helpersDir],
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        include: [componentsDir, styleDir, styleguideUtilsDir],
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
                  autoprefixer()
                ];
              },
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              import: [
                path.resolve('src/atoms/colors/variables.styl'),
                path.resolve('src/atoms/spacing/variables.styl'),
                path.resolve(`src/themes/${THEME}.styl`)
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      },
      {
        test: /\.css$/,
        include: customCssFile,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.svg$/,
        include: iconsDir,
        use: [
          {
            loader: 'babel-loader?presets[]=react'
          },
          {
            loader: 'svg-jsx-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      COUNTRY: JSON.stringify(COUNTRY),
      THEME: JSON.stringify(THEME)
    })
  ],
  devServer: {
    disableHostCheck: true
  }
};
