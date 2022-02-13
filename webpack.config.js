const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${path.resolve('./public')}`);

  return merge(
    {
      mode,
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          components: path.resolve(__dirname, 'src/components'),
        },
      },
      module: {
        rules: [
          {
            test:  /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ["url-loader", "file-loader"],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: /\.(ts|tsx)$/,
            use: ['ts-loader']
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
          title: 'optimize',
          filename: './index.html',
          template: "./public/index.html",
          favicon: './public/favicon.ico'
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
