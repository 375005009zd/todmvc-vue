const webpack= require('webpac')
const path = require('path')

module.exports= {
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle-[hash].js'
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacement()
    ]
}