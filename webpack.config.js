const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(path.resolve(__dirname, "./client/index.js"));
module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, "./client/index.js"),
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
      publicPath: "/",
    },
    // compress: true,
    // port: 9000,
    proxy: {
      "/api": "http://localhost:3000/",
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        // use: [
        //   process.env.NODE_ENV === 'production'
        //     ? MiniCssExtractPlugin.loader
        //     : 'style-loader',
        //   'css-loader',
        //   'sass-loader',
        // ],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  },
};
