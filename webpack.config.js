const path = require('path');
const webpack = require('webpack');


module.exports = () => ({
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve('./lib'),
    libraryTarget: 'umd',
    library: '@intelight/map-dashboard',
    filename: "index.js",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          context: __dirname,
          configFile: require.resolve(`./tsconfig.json`)
        }
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ],
  },
});
