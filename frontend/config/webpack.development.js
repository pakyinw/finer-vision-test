const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dev'),
      'process.env.endpoint': JSON.stringify('http://localhost:2021/trpc'),
    }),
  ],
  devServer: {
    historyApiFallback: true
  }  
}
