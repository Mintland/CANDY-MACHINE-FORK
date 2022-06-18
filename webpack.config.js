const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: "none",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  plugins: [
    new Dotenv(),
    new NodePolyfillPlugin(),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  performance: { hints: false },
  devtool: mode === "development" ? "inline-source-map" : false,
  target: "web",
  resolve: {
    fallback: {
      fs: false,
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  //   externals: {
  //     react: "React", // Case matters here
  //     "react-dom": "ReactDOM", // Case matters here
  //   },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
