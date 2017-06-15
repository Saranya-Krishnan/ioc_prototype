const nodeExternals = require('webpack-node-externals');
module.exports = [
    {
        entry: './server.js',
        output: {
            path: __dirname + '/',
            filename: "server.bundle.js"
        },
        module: {
            loaders: [
                {
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-1']
                    }
                }
            ]
        },
        target: 'node',
        externals: [nodeExternals()]
    },
    {
        entry: './src/views/index.js',
        output: {
            path: __dirname + '/bin',
            filename: 'app.bundle.js'
        },
        module: {
            loaders: [
                {
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-1']
                    }
                },
                {
                    test: /\.scss$/,
                    loader: 'style-loader!css-loader!sass-loader'
                }
            ]
        }
    }
];