const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** 開發模式 Port */
const DEV_SERVER_PORT = 9530;

/** API Service 位址 */
const API_PROXY_SERVER = 'http://localhost:44388';

/** src 資料夾路徑 */
const SOURCE_FOLDER_PATH = path.join(__dirname, 'src');

/** public 資料夾路徑 */
const PUBLIC_FOLDER_PATH = path.join(__dirname, 'public');

/** 打包後靜態檔案的資料夾名稱 */
const OUTPUT_STATIC_FOLDER_NAME = 'static';

/** 打包後資料夾路徑 (開發模式) */
const DEV_OUTPUT_PATH = path.join(__dirname, 'build');

/** 打包後資料夾路徑 (生產模式) */
const PROD_OUTPUT_PATH = path.join(__dirname, '../', 'dist', 'wwwroot');

/** output.publicPath 設定 */
const OUTPUT_PUBLIC_PATH = '/';

const baseConfig = {
  entry: {
    global: path.join(SOURCE_FOLDER_PATH, 'global.tsx'), // 全域檔案
    main: path.join(SOURCE_FOLDER_PATH, 'main.tsx'), // 主要程式進入點
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          { loader: 'css-loader', options: { url: false } },
          // 'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 只在 production 環境啟用壓縮
              disable: process.env.NODE_ENV === 'production' ? false : true,
            },
          },
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@src': SOURCE_FOLDER_PATH,
    },
  },
  target: 'web',
  optimization: {
    splitChunks: {
      minSize: 30, // chunk 的最小大小
      cacheGroups: {
        default: {
          name: 'common-chunk',
          chunks: 'initial',
          minChunks: 2, // 模組被引用2次以上才抽出
          priority: -20,
        },
        vendors: {
          // 分離第三方套件
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor-chunk',
          chunks: 'initial',
          priority: -10,
        },
        // 分離指定文件範例:
        // locallib: {
        //     test: /(src\/locallib\.js)$/,
        //     name: 'locallib',
        //     chunks: 'initial',
        //     priority: -9
        // }
      },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      MOCK_SERVER: process.env.MOCK_SERVER || '',
    }),
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${OUTPUT_STATIC_FOLDER_NAME}/[name].bundle.css`,
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_FOLDER_PATH, 'index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/assets',
          to: path.join(isDev ? DEV_OUTPUT_PATH : PROD_OUTPUT_PATH, 'assets'),
        },
      ],
    }),
  ],
};

const prodConfig = {
  mode: 'production',
  output: {
    path: PROD_OUTPUT_PATH,
    filename: `${OUTPUT_STATIC_FOLDER_NAME}/[name].[contenthash].js`,
    assetModuleFilename: `${OUTPUT_STATIC_FOLDER_NAME}/[hash][ext][query]`,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
};

const devConfig = {
  mode: 'development',
  output: {
    path: DEV_OUTPUT_PATH,
    filename: `${OUTPUT_STATIC_FOLDER_NAME}/[name].bundle.js`,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  devServer: {
    static: {
      directory: PUBLIC_FOLDER_PATH,
    },
    compress: true,
    port: DEV_SERVER_PORT,
    hot: true,
    historyApiFallback: true,
    // Proxy Example:
    proxy: {
      '/api': API_PROXY_SERVER,
    },
  },
};

module.exports = () => (isDev ? { ...baseConfig, ...devConfig } : { ...baseConfig, ...prodConfig });
