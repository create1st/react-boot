var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
//        './app.js'
    ],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './webpack/bundle.js'
    },
    module: {
        loaders: [
            {   test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: "babel",
                query:
                {
                    presets:['react']
                }
            },
            {   test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery' },
            {   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000' }
        ]
    }
};