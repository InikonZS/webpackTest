// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ejs = require('ejs');

/*ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
});*/

//CopyPlugin

const config = {
    entry: {
        main: './src/main.ts',
        index: './src/index.ts'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './main/main.html',
            templateContent: ()=> {
                return new Promise((resolve)=>resolve(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8" />
                            <title>Webpack App</title>
                        </head>
                        <body>
                            <h1>Hello world!</h1>
                            <h2>Tip: Check your console</h2>
                        </body>
                        
                    </html>
                    `)
                );
            },
            chunks: ['main'],
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index']
        }),

        new HtmlWebpackPlugin({
            filename: 'ej.html',
            templateContent: ()=> {
                return new Promise((resolve, reject)=>{
                    ejs.renderFile('./src/ejstest/index.ejs', {count: 5}, {}, function(err, str){
                        resolve(str)
                    });
                });
            },
            chunks: ['index']
        }),

        new CopyPlugin({
            patterns: [
              { from: "./src/copy", to: "public" },
            ],
          }),

        new CleanWebpackPlugin()

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                              exportLocalsConvention: "camelCase",  
                            },
                            sourceMap: true,
                            
                        },
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash][ext][query]'
                }
            },
            {
                test: /\.(inl.svg)$/i,
                type: 'asset/source',
            },
            {
                test: /\.myf$/i,
                loader: path.resolve(__dirname, './myLoader.js')
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
