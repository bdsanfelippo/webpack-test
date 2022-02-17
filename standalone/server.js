const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

app.use(express.static("client"));

const webpackConfig = require("../webpack/webpack.config");
const compiler = webpack(webpackConfig);
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
);


app.listen(7070, () => {
    console.log("Started standalone server. Listening on port 7070");
});