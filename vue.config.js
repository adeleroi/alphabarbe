const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, './admin/public'),
    devServer: {
        proxy: {
            '/setcustomclaims': {
                target: 'http://localhost:4000'
            }
        }
    }
}