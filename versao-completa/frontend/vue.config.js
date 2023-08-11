const webpack = require('webpack');
const dotenv = require('dotenv').config();

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          ...dotenv.parsed
        }
      })
    ]
  }
};