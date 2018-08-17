const path = require('path');
const webpack = require('webpack');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');


module.exports = () => ({
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    path: path.resolve('./lib'),
    libraryTarget: 'umd',
    library: 'material-ui-tags',
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
  plugins: [
    new PeerDepsExternalsPlugin()
  ]
});
