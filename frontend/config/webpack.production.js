const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('prod'),
      'process.env.endpoint': JSON.stringify('http://localhost:2021/trpc'),
    }),
  ],
}
