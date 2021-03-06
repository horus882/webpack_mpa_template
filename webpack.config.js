const path                      = require('path');
const webpack                   = require('webpack');
const fs                        = require('fs');
const glob                      = require('glob');
const HtmlWebpackPlugin         = require("html-webpack-plugin");
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');

var config = {
    mode: process.env.NODE_ENV,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/scripts/[name].js?[hash:8]',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ ['@babel/preset-env', { targets: 'defaults' }] ]
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            // plugins: [require('autoprefixer')],
                            postcssOptions: {
                                plugins: [ require('autoprefixer')({ grid: 'autoplace' }) ]
                            }

                        },
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [ require('autoprefixer')({ grid: 'autoplace' }) ]
                            }
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 0,
                            esModule: false,
                            name: '[path][name].[ext]?[hash:8]',
                            context: path.resolve(__dirname, 'src'),
                            publicPath: '../',
                            outputPath: './assets/',
                            fallback: require.resolve('file-loader'),
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable:    process.env.NODE_ENV === 'production' ? false : true,
                            mozjpeg:    { progressive: true, quality: 65 },
                            optipng:    { enabled: false },
                            pngquant:   { quality: [0.65, 0.9], speed: 4 },
                            gifsicle:   { interlaced: false },
                            // webp:       { quality: 75 },  // ???????????????????????? WebP ?????????
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 0,
                            esModule: false,
                            name: '[path][name].[ext]?[hash:8]',
                            context: path.resolve(__dirname, 'src'),
                            publicPath: '../',
                            outputPath: './assets/',
                            fallback: require.resolve('file-loader'),
                        }
                    }
                ]
            },
            {
                test: /\.(obj|fbx|mtl|gltf|bin)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            name: '[name].[ext]',
                            publicPath: './models/',
                            outputPath: './assets/',
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                            data: { NODE_ENV: process.env.NODE_ENV }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name].css?[hash:8]'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     filename: 'index.html'
        // }),
        new CopyWebpackPlugin([
            { from: 'public', to: './' },
        ]),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
        })
    ],
    performance: {
        maxEntrypointSize: 300000,
        // hints: process.env.NODE_ENV === 'development' ? 'warning' : false,
    },
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : 'source-map', // ?????? SourceMap: source-map
    devServer: {
        host: '0.0.0.0',                        // ??????????????????????????????
        useLocalIp: true,                       // ??????????????????????????????
        contentBase: path.join(__dirname, '/'), // contentBase ????????????????????????????????????????????????????????????????????????????????????????????????['./dist']
        // publicPath: '/dist/',                // publicPath ??????????????????????????????????????????????????????????????? devServer ????????? publicPath ?????????????????????????????? output ??????????????? publicPath ?????????
        watchContentBase: true,                 // html ???????????????????????????????????????
        compress: false,
        port: 7777,
        hot: true,
        open: false,
    }
}

const entry = {}
const entryFiles = glob.sync(path.join(__dirname, './src/pages/*.pug'));

Object.keys(entryFiles).map(index => {

    const entryFile = entryFiles[index];
    const match     = entryFile.match(/src\/pages\/(.*)\.pug/);
    const pageName  = match && match[1];

    entry[pageName] = `./src/scripts/${pageName}.js`;

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/pages/${pageName}.pug`),
            filename: `${pageName}.html`,
            // filename: process.env.NODE_ENV === 'production' ? `${pageName}.php` : `${pageName}.html`,
            // ????????? js ??????
            chunks: [pageName],
            inject: true,
            minify: {
                collapseWhitespace: false,
                collapseBooleanAttributes: true, 
                preserveLineBreaks: false,
                sortAttributes: true,
                removeComments: false
            }
        })
    );

})

config.entry = entry;

module.exports = config