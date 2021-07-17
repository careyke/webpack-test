const path = require('path');
const glob = require('glob');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const smp = new SpeedMeasureWebpackPlugin();

const SRC = path.join(__dirname, 'src');

const setMulEntry = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const dllReferencePlugins = [];
  const addAssetHtmlPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  const dllFiles = glob.sync(path.join(__dirname, './build/dll/**.*'));

  entryFiles.forEach((filePath) => {
    const match = filePath.match(/src\/(.*)\/index\.js$/);
    const fileName = match[1];
    entry[fileName] = filePath;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${fileName}/index.html`),
      filename: `${fileName}.html`,
      chunks: ['vendors', 'commons', fileName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
  })
  dllFiles.forEach((file) => {
    if (file.match(/dll\.js$/)) {
      console.log(path.resolve(__dirname, file));
      addAssetHtmlPlugins.push(new AddAssetHtmlPlugin({
        filepath: path.resolve(file)
      }))
    }
    if (file.match(/\.json$/)) {
      dllReferencePlugins.push(new webpack.DllReferencePlugin({
        manifest: require(path.resolve(__dirname, file))
      }))
    }
  })
  return { entry, htmlWebpackPlugins, dllReferencePlugins, addAssetHtmlPlugins }
}
const { entry, htmlWebpackPlugins, dllReferencePlugins, addAssetHtmlPlugins } = setMulEntry();

module.exports = smp.wrap({
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    publicPath: './'
  },
  mode: 'development',
  devtool: 'none',
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')], //减少模块搜索的层级，默认请客下会一层层去node_modules中查找
    extensions: ['.js'], //准确匹配文件后缀，确保没有后缀的模块是js文件
    mainFields: ['main'], //匹配第三包时，只搜索其中的main.js文件。默认情况下会有多个匹配方案
    // alias: {
    //   react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
    //   'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    // } //alias直接指定某个包的文件路径，不需要一层一层去搜索
  },
  module: {
    rules: [
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
      {
        test: /\.css$/,
        include: path.resolve('src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader:'file-loader',
            options:{
              name:'[name]_[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      fileName: '[name]-[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    // new HappyPack({
    //   loaders:['babel-loader'],
    //   threads:4
    // })
    new HardSourceWebpackPlugin(),
    // new webpack.DllReferencePlugin({
    //   manifest: require('./build/dll/library.json')
    // }),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
    new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module:'react',
          entry:'https://unpkg.com/react@16/umd/react.production.min.js',
          global:'React'
        },
        {
          module:'react-dom',
          entry:'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global:'ReactDOM'
        }
      ]
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${SRC}/**/*`, { nodir: true })
    })
  ].concat(htmlWebpackPlugins),
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         priority: 1
  //       },
  //       commons: {
  //         name: 'commons',
  //         minSize: 0,
  //         minChunks: 2,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
  optimization:{
    usedExports:true
  }
});
