const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);

  return merge(
    {
      mode,
      entry: "./src/index.js",
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "[name]-[hash].js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      module: {
        rules: [
          {
            test:  /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ["url-loader", "file-loader", 'file-loader?name=[name].[ext]'],
          },
          {
            test: /\.(tsx|ts|js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 0 
                }
              }
            ]
          }
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
          favicon: './public/favicon.ico',
          manifest: './public/manifest.json',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        hot: true
      },
    },
    modeConfiguration(mode)
  );
};
