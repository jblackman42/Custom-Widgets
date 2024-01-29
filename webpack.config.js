const path = require("path");

module.exports = {
  entry: "./src/index.js", // Replace with the path to your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // mode: "development", // Use 'production' for minified output
  mode: "production", // Use 'production' for minified output
};
