var path = require('path');
var fs = require('fs');
var node_modules = fs.readdirSync('node_modules').filter(function (x) { return x !== '.bin' });
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: ['babel-polyfill', './src/index.js'],
    // vendor:["react","react-dom"],
    // contact: './src/contact.js'
  },
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkHash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: false
  },
  plugins: [
    new CommonsChunkPlugin({
      names: ['vendor', 'manifest'] //name是提取公共代码块后js文件的名字。
      // chunks: ['vendor'] //只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      minify: {
        // collapseWhitespace:true
      },
      // hash: true,
      // excludeChunks:['contact'],
      chunks: ['manifest', 'vendor', 'index'],
      // chunks:['vendor','index'],
      template: './src/template/index.ejs' // Load a custom template (ejs by default see the FAQ for details)
    }),
    // new HtmlWebpackPlugin({
    //   title: '2',
    //   minify: {
    //     // collapseWhitespace:true
    //   },
    //   // hash: true,
    //   chunks: ['manifest', 'vendor', 'contact'],
    //   filename: 'contact.html',
    //   template: './src/template/contact.ejs' // Load a custom template (ejs by default see the FAQ for details)
    // })
  ],
  externals: function (context, request, cb) {
    if (node_modules.indexOf(request) !== -1) {
      cb(null, 'commonjs ' + request);
      return;
    }
    cb();
  }
};
