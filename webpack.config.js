const path = require('path');

module.exports = {
    entry: {
        main: './assets/scripts/index.js', // Main entry file
    },

    output: {
        'path': path.resolve(__dirname, 'static'),
        'filename': '[name].bundle.js'
    }
}