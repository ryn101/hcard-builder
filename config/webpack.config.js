const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function (webpackEnv, argv) {
    const isEnvProduction = argv.mode === 'production';

    return {
        entry: './src/index.jsx',
        output: {
            path: path.resolve(__dirname, '../build/assets/'),
            publicPath: 'assets/',
            filename:
                isEnvProduction
                    ? 'js/[name].[hash].js'
                    : 'js/bundle.js',
        },
        mode: webpackEnv,
        devtool: isEnvProduction ? false : 'eval-source-map',
        module: {
            rules: [
                {
                    oneOf: [
                        /* ******************** *
                         * JS/JSX Loader
                         * ******************** */
                        {
                            test: /\.jsx?$/,
                            exclude: /(node_modules|bower_components)/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/env'],
                                    },
                                },
                                { loader: 'eslint-loader' },
                            ],
                        },

                        /* ******************** *
                         * SASS Loader
                         * ******************** */
                        {
                            test: /\.(sass|scss|css)$/,
                            include: /(sass|css)/,
                            use: [
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: {
                                        hmr: !isEnvProduction,
                                    },
                                },
                                'css-loader',
                                'sass-loader',
                            ],
                        },

                        /* ******************** *
                         * SVG Loader
                         * ******************** */
                        {
                            test: /\.svg$/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                },
                                {
                                    loader: 'react-svg-loader',
                                    options: {
                                        jsx: true,
                                    },
                                },
                            ],
                        },

                        /* *********************
                         * File Loader
                         * ******************** */
                        {
                            loader: 'file-loader',
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise be processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: isEnvProduction
                                    ? 'media/[name].[hash:8].[ext]'
                                    : 'media/[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: shouldUseSourceMap,
                }),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.scss$/g,
                    cssProcessorOptions: {
                        map: shouldUseSourceMap
                            ? {
                                inline: false,
                                annotation: true,
                            }
                            : false,
                    },
                }),
            ],
        },
        resolve: { extensions: ['*', '.js', '.jsx'] },
        plugins: [
            // Allow hot swapping of updated files
            isEnvProduction && new webpack.HotModuleReplacementPlugin(),
            // Clean output directory
            new CleanWebpackPlugin(),
            // Extract and minify css from JS
            new MiniCssExtractPlugin({
                filename:
                    isEnvProduction
                        ? '[name].[contenthash].css'
                        : 'main.css',
            }),
            // Minify HTML files for production builds
            new HtmlWebpackPlugin(
                ({
                    template: './public/index.html',
                    filename: '../index.html',
                    inject: true,
                    alwaysWriteToDisk: true,
                    ...(isEnvProduction ? {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                        },
                    } : undefined),
                }),
            ),
            // Allow the ability to write any HtmlWebpackPlugin changes directly to file to
            // aid in reducing relative path complexity when running the dev server
            new HtmlWebpackHarddiskPlugin(),
            // Copy across static files
            new CopyWebpackPlugin([{
                from: 'public',
                to: '../',
                ignore: '*.html',
            }]),
        ].filter(Boolean),

        // Configure the development server
        devServer: {
            port: 3000,
            hotOnly: true,
            contentBase: path.join(__dirname, '../build'),
        },
    };
};
