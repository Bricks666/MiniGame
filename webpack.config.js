const path = require("path");
require("babel-polyfill");

module.exports = {
  mode: "development",
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/minigame.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
