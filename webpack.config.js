const path = require('path')


module.exports = {
    mode : 'development',
    entry: {
        admin: './src/admin.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].bundle.js'
    },
    watch: true
}