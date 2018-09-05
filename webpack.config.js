const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //css分离
const autoprefixer = require("autoprefixer"); //兼容加前缀
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩

// const safe   = require('postcss-safe-parser');
module.exports = {
  entry: {
    index: "./src/js/index.js",
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader"]
      })
    },{
      test:/\.js$/,
      exclude: /node_modules/, 
      loader: "babel-loader"
    }] //配置 babel 转化js语法
  },


  plugins: [
    new ExtractTextPlugin("[name].bundle.css"),
    new CleanWebpackPlugin(["dist"]),
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.css$/g,
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true,
      autoprefixer: false//cssnano 集成了autoprefixer的功能
    }),
  ],

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

};