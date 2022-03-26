const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, "dist"),
        publicPath: './',
        assetModuleFilename: 'images/[name][ext][query]'
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    }), new MiniCssExtractPlugin({
        filename: "[name].css"
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                test: /\.(?:js|ts)$/, 
                loader: "source-map-loader" 
            }
        ]
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js'
        },
        extensions: ['.ts', '.js']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CSSMinimizerPlugin()
        ]
    }
}