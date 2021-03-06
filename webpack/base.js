const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const fs = require('fs');

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    https: {
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem')
    }
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.fnt$/,
        use: [
          'file-loader',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              // by adding this it will extract each "page” file from the xml as well
              attrs: ['page:file'],
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyWebpackPlugin([{
      from:'./fbapp-config.json',
      to:'',
      flatten:true
      }]),
  ]
};
