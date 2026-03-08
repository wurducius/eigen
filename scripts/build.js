const path = require('path')
const fs = require('fs')
const webpack = require("webpack")
const getWebpackConfig = require("../webpack/webpack-config")

const buildWebpack = () => {
        return webpack(getWebpackConfig(), (err, stats) => {
            console.log(err)
        })
}

const copyPublic = () => {
    const publicPath = path.join(process.cwd(), "public")
    const publicTargetPath = path.join(process.cwd(), "build")
    fs.cpSync(publicPath, publicTargetPath, {recursive: true});
}

const build = () => {
    buildWebpack()
    copyPublic()
}

build()
