const path = require('path');

module.exports = {
    // entry: './assets/scripts/index.js',
    entry: {
        main: './assets/scripts/index.js', // Main entry file
        filters: './assets/scripts/filters.js', // Additional entry file (example)
    },

    output: {
        'path': path.resolve(__dirname, 'static'),
        'filename': '[name].bundle.js'
    }
}