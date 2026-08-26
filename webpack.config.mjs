// Webpack 5 Config

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';

// ENV
const devMode = process.env.NODE_ENV !== 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let config = {
    mode: devMode ? "development" : "production",

    watchOptions: {
        ignored: ["node_modules/**"]
    },

    devtool: devMode ? "source-map" : false,

    entry: {
        boatless: [
            './boat.less'
        ],

        demo : [
            './test/_dev/demo.less'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'test/dist'),
        clean: true,
        publicPath: '',
        filename: '[name].js',
        assetModuleFilename: '[name][ext][query]'
    },

    module: {
        rules: [

            // STYLES
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: devMode ? true : false
                        }
                    },
                ]
            }
        ]
    },

    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name]-min.css',
        }),
        new StylelintPlugin({
            configFile: '.stylelintrc',
            context: 'less',
            files: '*.less',
            failOnError: true,
            quiet: false,
            emitErrors: true
        }),
    ].filter(Boolean)
};

export default config;
