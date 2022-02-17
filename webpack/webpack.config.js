const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, "../"),
    entry: {
        app: [path.resolve(__dirname, "../src/index.js")]
    },
    output: {
        path: path.resolve(rootPath, "public"),
        filename: "[name].bundle.js",
        library: {
            name: "App",
            type: "global"
        },
        publicPath: "/"
    },
    resolve: {
        extensions: [ ".js", ".json"]
    },
    module: {
        rules: [
        //   {
        //     test: /\.(js)$/,
        //     exclude: [
        //       {
        //         // exclude all node_modules from running through babel-loader
        //         and: [path.resolve(__dirname, "node_modules")],
        //         // exception: include these node_modules
        //         not: [
        //           // add any node_modules that shoudl be run through babel here
        //         ]
        //       }
        //     ]
        //   },
          {
            test: /\.html$/i,
            loader: "html-loader"
          },
          {
            test: /\.(css|less)$/i,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  url: false
                }
              },
            ]
          },
          {
            test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf|otf)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000
                }
              }
            ]
          }
        ]
      },
      optimization: {
          // this will split shared components into chunks; reduces duplicate code in various bundles
          splitChunks: {
              chunks: "all"
          }
      },
      experiments: {
        topLevelAwait: true
      },
      plugins: [
        // forces all contents of the output.path directory to be removed prior to re-packing
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyPlugin({
          patterns: [
            {
              from: "css/**",
              context: path.resolve(__dirname, "../"),
              to: ""
            },
          ]
        }),
        new HtmlWebpackPlugin({
          template: "standalone/client/app.html"
        }),
      ]
}