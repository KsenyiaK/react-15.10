'use strict';

const path = require( 'path' );

module.exports = {
    entry: {
        app: path.join( __dirname, 'src', 'app', 'app' )
    },

    output: {
        path: path.join( __dirname, 'dist' ),
        filename: '[name].js'
    },

    resolve: {
        extensions: [ '.js', '.jsx', '.css' ]
    },

    devtool: 'cheap-inline-module-source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};