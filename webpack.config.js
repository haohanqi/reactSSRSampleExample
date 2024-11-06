const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const config = {
    mode: "development",
    entry: {
      index: "./hydrate.js",
      //index: env.RENDER_TYPE === "reactssr" ? "./hydrate.js" : "./index.js",
    },
    devtool: "inline-source-map",
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 8080, // Port for webpack-dev-server
      proxy: [
        {
          context: ["/api", "/ssr"],
          target: "http://localhost:3001",
        },
      ],
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
    plugins: [
      new HtmlWebpackPlugin({
        title: "Development",
        template: path.resolve(
          __dirname,
          "./hydrate.html"
          //   env.RENDER_TYPE === "reactssr" ? "./hydrate.html" : "./index.html"
        ),
      }),
    ],
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
