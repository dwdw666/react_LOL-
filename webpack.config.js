const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env, argv){
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
    const isEnvProduction = argv.mode === 'production'; 
    
    return{
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development', 
        devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',  // 修改
        entry: path.join(__dirname, './src/index.js'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new htmlWebpackPlugin({
                template: path.join(__dirname, './public/index.html'),
                filename: 'index.html'
            })
        ],
        module: {
            rules: [
                {test: /\.js$/, exclude: /node_modules/, enforce: "pre", use: 'babel-loader'}, 
                {test: /\.css$/, include: [path.resolve(__dirname, 'src/styles'), /node_modules/], use: ['style-loader', 'css-loader', 'postcss-loader']},
                {test: /\.css$/, exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/], use: ['style-loader', 'css-loader?modules', 'postcss-loader']},
                {test: /\.less$/, include: [path.resolve(__dirname, 'src/styles'), /node_modules/], use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']},
                {test: /\.less$/, exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/], use: ['style-loader', 'css-loader?modules', 'postcss-loader', 'less-loader']},
                {test: /\.(eot|svg|ttf|woff|woff2|png)\w*/, use: 'file-loader'},     
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ],
        },
        devServer: {
            historyApiFallback: true,
            contentBase: './dist/',
            hot: true
        },
        resolve: {
            alias: {
              '@': path.resolve('src')
            }
        }
    }
}