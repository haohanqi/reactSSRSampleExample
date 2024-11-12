const path = require("path");

module.exports = () => {
  const config = {
    mode: "development",
    entry: {
      index: "./hydrate.js",
    },
    devtool: "inline-source-map",
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 8080, // Port for webpack-dev-server
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
        },
      ],
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
    optimization: {
      runtimeChunk: "single",
    },
  };

  return config;
};
