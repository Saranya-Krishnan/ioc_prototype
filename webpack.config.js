const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders:['react-hot-loader','babel-loader']
            },
            {
                test: /\.scss$/,
                loader:'style-loader!css-loader!sass-loader'
            }
        ]
    }
};