const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { version } = require('./util')
const path = require('path')
let pathsToClean = [
  'dist',
];

// the clean options to use
let cleanOptions = {
  root: path.resolve(__dirname,'../'),
  verbose: true,
  dry: false
}

module.exports = merge(baseWebpackConfig, {  
  mode: 'production',
  // entry: './src/index.js',
  // entry: {
  //   app: './src/index.js',
  //   // vendors: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-router-redux']
  // },
  // output: {
  //   path: path.join(process.cwd(),'dist'),//path.resolve(__dirname,'dist'),
  //   filename: '[name].async.js'
  // },
  // devtool: false,
  module: {
    rules:[
      // { test: /\.(jsx|js)?$/,
      //   exclude: /node_modules/,
      //   include: path.join(process.cwd(),'src'),
      //   use: "babel-loader",
      // },
      // {
      //   test: /\.css$/,
      //   use:
      // },            
      // { test: /\.(css|less)$/, 
      //   use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'}]
      // },
    ]
  },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       minify: (file, sourceMap) => {
  //         // https://github.com/mishoo/UglifyJS2#minify-options
  //         const uglifyJsOptions = {
  //           /* your `uglify-js` package options */
  //           compress:{
  //             drop_console:true
  //           }
  //         };
  
  //         if (sourceMap) {
  //           uglifyJsOptions.sourceMap = {
  //             content: sourceMap,
  //           };
  //         }
  
  //         return require('uglify-js').minify(file, uglifyJsOptions);
  //       },
  //     }),
  //   ],
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new ExtractTextPlugin('index.css'),
    new CleanWebpackPlugin(pathsToClean,cleanOptions),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true,
    //     drop_console: true
    //   }
    // }),
    //new webpack.optimization.minimize(),
    // new HtmlWebpackPlugin({template: './src/index.ejs', inject: true}),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    
    // new CopyWebpackPlugin([
    //   { 
    //     from: path.resolve(__dirname,'./public'),
    //     to: './'
    //   }
    // ])
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    // new webpack.optimization.splitChunks('vendors', 'vendors.js'),
    
  ],  
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
    ]
  }
});
