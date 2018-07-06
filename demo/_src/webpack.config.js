var path = require('path');

module.exports = {
    entry: {
        demo: __dirname
    },
    output: {
        path: path.join(__dirname, '..'),
        publicPath: './',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: 'url-loader'
            }
        ]
    }
};
