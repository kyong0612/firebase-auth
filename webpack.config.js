module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'js/app.js',
  },
  devtool: false,
  devServer: {
    client: false,
    hot: false,
    static: {
      directory: __dirname,
    },
  },
}
