const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const htmlLoader = require('./webpack/html.loader');

/*var express = require('express');
var proxy = require('http-proxy-middleware');

// proxy middleware options
var options = {
    target: 'http://localhost:8000', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/api/old-path' : '/api/new-path',     // rewrite path
        '^/api/remove/path' : '/path'           // remove base path
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000' : 'http://localhost:8000'
    }
};

// create the proxy (without context)
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server
var app = express();
app.use('/api', exampleProxy);
app.listen(3000);*/

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};
/*
const history = require('connect-history-api-fallback')
const express = require('express')

var app = express()
    .use(history({
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        verbose: true,
        index: PATHS.source + '\\index.html'
    }))
    .listen(3000);
*/


const common = merge([
    {
        entry: PATHS.source + '/index.js',
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/index.html'
            })
/*            new webpack.DefinePlugin({
                API_URL: JSON.stringify('https://localhost:8080')
            })*/
        ]
    },
    htmlLoader()
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
};










