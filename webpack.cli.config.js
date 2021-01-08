const path = require('path');

module.exports = {
  entry:'./src/library-target/index.js',
  output: {
    filename: 'var.js',
    path: path.join(__dirname, 'dist/library-target'),
    library: "MyLibrary",
    // libraryTarget: "commonjs2"
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        include: path.resolve('src'),
        // loader: 'babel-loader'
        // loader:'happypack/loader'
        use: [
          // {
          //   loader:'thread-loader',
          //   options:{
          //     workers:3
          //   }
          // },
          'cache-loader',
          'babel-loader?cacheDirectory=true'
        ]
      },
    ]
  },
  optimization:{
    minimize:false
  }
}