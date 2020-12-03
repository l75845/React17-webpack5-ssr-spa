const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const CopyPlugin = require('copy-webpack-plugin');

const cssLoaderConfig = (isModule) => {
  let config = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    'postcss-loader',
  ];
  if (isModule) {
    config[1]['options'] = {
      importLoaders: 1,
      modules: {
        mode: 'local',
        localIdentName:
          _mode === 'development' ? '[path][name]__[local]' : '[hash:base64]',
      },
    };
  } else {
    config[1]['options'] = {
      importLoaders: 2,
    };
    config.push({ loader: 'sass-loader' });
  }
  return config;
};

/**
 * @type {import('webpack').Configuration}
 */
const webpackBaseConfig = {
  entry: {
    app: resolve('src/web/index.tsx'),
  },
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundule.js',
    assetModuleFilename: 'scripts/[name].[contenthash:5].bundule.[ext]',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: resolve('src'),
        exclude: [/node_modules/],
        use: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.module\.css$/,
        use: cssLoaderConfig(true),
        include: /\.module\.css$/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: cssLoaderConfig(false),
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        // loader: 'url-loader',
        type: 'asset',
      },
    ],
  },
  experiments: {
    asset: true,
  },
  resolve: {
    alias: {
      '@assets': resolve('src/web/assets'),
      '@pages': resolve('src/web/pages'),
      '@components': resolve('src/web/components'),
      '@recoil': resolve('src/web/recoil'),
      '@environment':resolve(`src/web/environment/environment.${ _mode === 'development'?'env':'prod'}.ts`)
    },
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  plugins: [
    new ProgressBarPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: resolve(__dirname, 'src/web/assets/scripts/*'),
    //       to: 'scripts/[name].[ext]',
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: 'hello world',
      favicon: resolve(__dirname, 'src/web/assets/icon/webpackicon.ico'),
      filename: '../index.html',
      template: resolve(__dirname, 'src/web/assets/index.html'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running '],
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
        });
      },
    }),
  ],
};
module.exports = merge(webpackBaseConfig, _mergeConfig);