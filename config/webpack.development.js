const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('🐻 webpack开发环境');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: resolve(__dirname, "..","dist"),
    compress: true,
    publicPath:'/',
    historyApiFallback: true,
    port: 3000
  },
  watch:true,
  plugins:[
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
  ]
};
