module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/app",
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: require.resolve("swc-loader"),
      // },
    ],
  },
  output: {
    libraryTarget: "commonjs2"
  },
  externals: ['url'],
  resolve: {
    extensions: [".tsx", ".ts", "..."],
  },
};
