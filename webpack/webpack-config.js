const path = require("node:path")
const BundleWebpackAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const cwd = process.cwd()
const buildPath = path.join(cwd, "build")
const entryPath = path.join(cwd, "project", "index.js")
const analyze = false

const getWebpackConfig = () => ({
    mode: "development",
    entry: entryPath,
    output: {
        filename: `assets/js/[name].js`,
        path: buildPath,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [analyze && new BundleWebpackAnalyzerPlugin(),
    ].filter(Boolean),
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                dependencies: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "dependencies",
                    chunks: "all",
                    reuseExistingChunk: true,
                    idHint: "dependencies",
                },
            },
        },
    },
    devtool: false,
})

module.exports = getWebpackConfig
