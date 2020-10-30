const { join, resolve } = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));

// eslint-disable-next-line no-underscore-dangle
const _mode = argv.mode || 'development';
const TerserPlugin = require('terser-webpack-plugin');

const cssLoaderConfig = (isModule) => {
  const config = [
    // MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    'postcss-loader',
  ];
  if (isModule) {
    config[1].options = {
      importLoaders: 1,
      modules: {
        mode: 'local',
        localIdentName:
          _mode === 'development' ? '[path][name]__[local]' : '[hash:base64]',
      },
    };
  } else {
    config[1].options = {
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
  mode: _mode,
  devtool: _mode === 'development' ? 'source-map' : false,
  entry: {
    app: resolve('src/web/pages/App/index-server.tsx'),
    // app:resolve('src/web/pages/App/index.tsx')
  },
  output: {
    path: join(__dirname, '../dist'),
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
  // target: 'node',
  // externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: resolve('src'),
        exclude: [/node_modules/],
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    legacy: true,
                  },
                ],
                '@babel/plugin-transform-modules-commonjs',
              ],
            },
          },
        ],
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
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@interfaces': resolve('src/server/shared'),
      '@config': resolve('src/server/config'),
      '@middlewares': resolve('src/server/middlewares'),
      '@assets': resolve('src/web/assets'),
      '@pages': resolve('src/web/pages'),
      '@components': resolve('src/web/components'),
    },
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },

  plugins: [
    new ProgressBarPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running '],
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
      },
      onErrors(severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
        });
      },
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      canPrint: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'assets/styles/[name].[contenthash:5].css',
    //   chunkFilename: 'assets/styles/[id].[contenthash:5].css',
    // }),
  ],
};

if (_mode === 'production') {
  webpackBaseConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
      }),
    ],
  };
}

module.exports = webpackBaseConfig;
