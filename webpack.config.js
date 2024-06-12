const path = require('path');

module.exports = {
    entry: {
        main: './assets/scripts/index.js', // Main entry file
        filters: './assets/scripts/filters.js',
        utils: './assets/scripts/utils.js',
    },

    output: {
        'path': path.resolve(__dirname, 'static'),
        'filename': '[name].bundle.js'
    }
}