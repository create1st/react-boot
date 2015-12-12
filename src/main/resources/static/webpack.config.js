var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'bootstrap-webpack!./bootstrap.config.js',
        './app.js'
    ],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './webpack/bundle.js'
    },
    node: {
        net: 'empty'
    },
    plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
    ],
    module: {
        loaders: [
            {   test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets:['react']
                }
            },
            {   test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery' },
            {   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000' },
            {   test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};