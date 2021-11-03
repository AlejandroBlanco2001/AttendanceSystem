const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    module:{
        rules:[
            {
                test: /\.js$|\.jsx$/,
                include: [path.resolve(__dirname,'src')]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
}